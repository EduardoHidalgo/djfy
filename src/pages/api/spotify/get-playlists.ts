import type { NextApiRequest, NextApiResponse } from "next";
import { Spotify, SpotifyArgs, SpotifyApi } from "@/libs/spotify";

interface QueryParams extends SpotifyArgs {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SpotifyApi.ListOfUsersPlaylistsResponse | Error>
) {
  try {
    const query = req.query as unknown as QueryParams;
    const spotify = new Spotify({ ...query });

    const result = await spotify.getPlaylists();

    if (result !== null && result.statusCode === 200)
      res.status(200).json(result.body);
    else res.status(404).json(new Error("not found"));
  } catch (error: any) {
    res.status(500).json(error as Error);
  }
}
