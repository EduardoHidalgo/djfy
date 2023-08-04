import { ErrorCode, Responses, SpotifyArgs, SpotifyError } from "./types";

export class Spotify {
  private code: string;
  private clientId: string;
  private codeVerifier: string;

  private redirectUri = "http://localhost:3000/callback";

  constructor({
    clientId,
    code,
    codeVerifier,
  }: {
    clientId: string;
    code: string;
    codeVerifier: string;
  }) {
    this.clientId = clientId;
    this.code = code;
    this.codeVerifier = codeVerifier;
  }

  async getToken(): Promise<string | Error> {
    let body = new URLSearchParams({
      grant_type: "authorization_code",
      code: this.code,
      redirect_uri: this.redirectUri,
      client_id: this.clientId,
      code_verifier: this.codeVerifier,
    });

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP status " + response.status);
        }
        return response.json();
      })
      .then((data) => data.access_token as string)
      .catch((error) => new Error(error));

    return response;
  }

  async getSavedTracks({
    token,
    limit,
    offset,
  }: SpotifyArgs.GetSavedTracks): Promise<Responses.GetSavedTracks | Error> {
    let uri = "https://api.spotify.com/v1/me/tracks";
    uri += `?limit=${limit}&offset=${offset}`;

    const result = await fetch(uri, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .catch((error) => new Error(error));

    if (result instanceof Error) return result as Error;

    if (Object.hasOwn(result, "error")) {
      return this.errorHandler(result as SpotifyError);
    }

    return result as Responses.GetSavedTracks;
  }

  async getProfile(token: string): Promise<any | Error> {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = await response.json();

    return data;
  }

  private errorHandler(result: SpotifyError): Error {
    switch (result.error.status) {
      case ErrorCode.Forbidden:
        return new Error(result.error.message);
      case ErrorCode["Too Many Requests"]:
        return new Error(result.error.message);
      case ErrorCode.Unauthorized:
        return new Error(result.error.message);
      default:
        return new Error(result.error.message);
    }
  }
}
