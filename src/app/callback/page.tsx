"use client";
import { FC, useEffect, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";

import { SessionState, useSpotifySession } from "@/hooks/useSpotifySession";

interface CallbackPageProps {}

const CallbackPage: FC<CallbackPageProps> = ({}) => {
  const { session, sessionState, setSession } = useSpotifySession();
  const [isReady, setIsReady] = useState(false);

  const code = useSearchParams().get("code");

  useEffect(() => {
    if (sessionState === SessionState.success && code !== null) {
      setSession({ ...session, code });
      setIsReady(true);
    }
  }, [sessionState, code]);

  if (sessionState === SessionState.error)
    return <div className="text-white">Something has failed.</div>;

  if (isReady) {
    return redirect("/dashboard");
  }

  return <div className="text-white">loading</div>;
};

export default CallbackPage;
