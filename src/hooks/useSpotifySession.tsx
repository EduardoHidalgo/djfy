import { useEffect, useState } from "react";

export enum SessionState {
  error = "error",
  loading = "loading",
  revalidate = "revalidate",
  success = "success",
}

export interface SpotifySession {
  expires?: Date;
  code?: string;
  token?: string;
  codeVerifier?: string;
}

export const useSpotifySession = (): {
  session: SpotifySession | null;
  setSession: (value: SpotifySession) => void;
  sessionState: SessionState;
} => {
  const USE_SPOTIFY_SESSION_KEY = "spotify_session";

  const [session, setSession] = useState<SpotifySession | null>(null);
  const [state, setState] = useState<SessionState>(SessionState.loading);

  useEffect(() => getLocalStorage(), []);

  const setValue = (value: SpotifySession) => {
    try {
      if (window === undefined) return;

      const json = JSON.stringify(value);
      window.localStorage.setItem(USE_SPOTIFY_SESSION_KEY, json);

      setSession(value);
      setState(SessionState.success);
    } catch (error) {
      console.error(error);
      setState(SessionState.error);
    }
  };

  const getLocalStorage = () => {
    try {
      if (window === undefined) return;

      const json = window.localStorage.getItem(USE_SPOTIFY_SESSION_KEY);
      if (json == null) {
        setSession(null);
        return setState(SessionState.success);
      }

      const tempSession = JSON.parse(json) as SpotifySession;

      if (tempSession.expires !== undefined) {
        const now = new Date();

        if (now.getTime() > new Date(tempSession.expires).getTime()) {
          setSession(null);
          return setState(SessionState.revalidate);
        }
      }

      setSession(tempSession);
      return setState(SessionState.success);
    } catch (error) {
      console.error(error);
      setState(SessionState.error);
    }
  };

  return { session, setSession: setValue, sessionState: state };
};
