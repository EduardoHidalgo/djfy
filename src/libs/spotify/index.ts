import SpotifyWebApi from "spotify-web-api-node";
import { Credentials, Response, SpotifyApi } from "./types";

export * from "./types";

export interface SpotifyArgs
  extends Partial<Pick<Credentials, "accessToken" | "refreshToken">> {}

export class Spotify {
  private instance: SpotifyWebApi;

  constructor(args: SpotifyArgs) {
    // credentials are optional
    this.instance = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: "http://localhost:3000/api/callback",
      ...args,
    });
  }

  async getPlaylists() {
    return await this.instance.getUserPlaylists({
      limit: 30,
    });
  }

  async getLikedTracks() {
    return await this.instance
      .getMySavedTracks({
        limit: 50,
      })
      .then((res) => res)
      .catch((error) => error as Response<SpotifyApi.ErrorObject>);
  }

  createAuthUrl(scopes: string[], state: string) {
    return this.instance.createAuthorizeURL(scopes, state);
  }

  async authorize(code: string) {
    return await this.instance.authorizationCodeGrant(code);
  }

  async getAccount() {
    return await this.instance.getMe();
  }

  setAccessToken(accessToken: string) {
    return this.instance.setAccessToken(accessToken);
  }

  setRefreshToken(refreshToken: string) {
    return this.instance.setRefreshToken(refreshToken);
  }
}
