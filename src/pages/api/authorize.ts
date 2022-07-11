import type { NextApiRequest, NextApiResponse } from "next";
import { Spotify } from "@/libs/spotify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void | Error>
) {
  try {
    const spotify = new Spotify({});

    const scopes = [
        "user-read-private",
        "user-read-email",
        "user-library-read",
        "playlist-read-private",
      ],
      state = String(process.env.SPOTIFY_STATE);

    var authorizeURL = spotify.createAuthUrl(scopes, state);

    res.redirect(authorizeURL);
  } catch (error: any) {
    res.status(500).json(error as Error);
  }
}
