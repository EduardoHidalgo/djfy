"use client";
import { FC, useEffect } from "react";
import { redirect, useSearchParams } from "next/navigation";

import { SessionState, useSpotifySession } from "@/hooks/useSpotifySession";

interface CallbackPageProps {}

const CallbackPage: FC<CallbackPageProps> = ({}) => {
  const { session, sessionState, setSession } = useSpotifySession();

  const code = useSearchParams().get("code");

  useEffect(() => {
    if (sessionState === SessionState.success && code !== null) {
      setSession({ ...session, code });
    }
  }, [sessionState]);

  if (sessionState === SessionState.error)
    return <div>Something has failed.</div>;

  if (
    session !== null &&
    sessionState === SessionState.success &&
    session.code !== undefined
  ) {
    return redirect("/dashboard");
  }

  return <div>loading</div>;
};

export default CallbackPage;
