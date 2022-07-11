import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/prisma";
import { Spotify } from "@/libs/spotify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void | Error>
) {
  try {
    const spotify = new Spotify({});

    const code = String(req.query.code);
    const codeGrant = await spotify.authorize(code);

    if (codeGrant.statusCode === 200) {
      spotify.setAccessToken(codeGrant.body.access_token);
      spotify.setRefreshToken(codeGrant.body.refresh_token);

      const result = await spotify.getAccount();

      const userExists = await prisma.user.findFirst({
        where: { email: result.body.email },
      });

      if (userExists === null) {
        const createdUser = await prisma.user.create({
          data: {
            accessToken: codeGrant.body.access_token,
            avatar: result.body.images ? result.body.images[0].url : undefined,
            displayName: result.body.display_name,
            email: result.body.email,
            externalLink: result.body.external_urls.spotify,
            refreshToken: codeGrant.body.refresh_token,
            spotifyId: result.body.id,
          },
        });

        res.redirect(
          `http://localhost:3000?result=success&user=${createdUser.id}`
        );
      } else {
        const updatedUser = await prisma.user.update({
          where: {
            id: userExists.id,
          },
          data: {
            accessToken: codeGrant.body.access_token,
            refreshToken: codeGrant.body.refresh_token,
          },
        });

        res.redirect(
          `http://localhost:3000?result=success&user=${updatedUser.id}`
        );
      }
    } else {
      res.redirect(`http://localhost:3000?result=failed`);
    }
  } catch (error: any) {
    res.status(500).json(error as Error);
  }
}
