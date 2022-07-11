import type { NextApiRequest, NextApiResponse } from "next";
import { Spotify, SpotifyArgs, SpotifyApi, Response } from "@/libs/spotify";

interface QueryParams extends SpotifyArgs {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SpotifyApi.UsersSavedTracksResponse | Error>
) {
  try {
    const query = req.query as unknown as QueryParams;
    const spotify = new Spotify({ ...query });

    const result = await spotify.getLikedTracks();

    console.log({ result });

    if (result.statusCode === 200) {
      res
        .status(200)
        .json((result as Response<SpotifyApi.UsersSavedTracksResponse>).body);
    } else
      res
        .status(result.statusCode)
        .json(
          new Error((result as Response<SpotifyApi.ErrorObject>).body.message)
        );
  } catch (error: any) {
    res.status(500).json(error as Error);
  }
}
