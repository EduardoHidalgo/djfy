export enum ErrorCode {
  /** The request has succeeded. The client can read the result of the request
   * in the body and the headers of the response. */
  OK = 200,
  /** The request requires user authentication or, if the request included
   * authorization credentials, authorization has been refused for those
   * credentials. */
  Unauthorized = 401,
  /** The server understood the request, but is refusing to fulfill it. */
  Forbidden = 403,
  /** Rate limiting has been applied. */
  "Too Many Requests" = 429,
}

export interface SpotifyError {
  error: {
    status: number;
    message: string;
  };
}

export namespace SpotifyArgs {
  export interface Auth {
    token: string;
  }

  /** Get a list of the songs saved in the current Spotify user's 'Your Music'
   * library.
   */
  export interface GetSavedTracks extends Auth {
    /** The maximum number of items to return. Default: 20. Minimum: 1.
     * Maximum: 50. */
    limit: number;
    /** The index of the first item to return. Default: 0 (the first item).
     * Use with limit to get the next set of items. */
    offset: number;
  }
}

export namespace Models {
  export interface SavedTrack {
    added_at: Date;
    track: Track;
  }

  export interface Track {
    album: Album;
    artists: Array<Artist>;
    disc_number: number;
    duration_ms: number;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    is_playable: string;
    name: string;
    track_number: number;
    uri: string;
  }

  export interface Album {
    album_type: "album" | "single" | "compilation";
    total_tracks: number;
    id: string;
    href: string;
    images: Array<Image>;
    release_date: string;
    name: string;
  }

  export interface Artist {
    followers: number;
    href: string;
    images: Array<Image>;
    name: string;
    uri: string;
  }

  export interface Image {
    url: string;
    height: number;
    width: number;
  }
}

export namespace Responses {
  export interface Page {
    total: number;
    previous: string | null;
    offset: string;
    next: string | null;
    limit: string;
    href: string;
  }

  export interface GetSavedTracks extends Page {
    items: Array<Models.SavedTrack>;
  }
}
