"use client";
import { FC, useState } from "react";
import { redirect } from "next/navigation";

import { useSpotifySession } from "@/hooks/useSpotifySession";
import { generateUrlAuthCodeFlow } from "@/lib/callbacks";
import { Button } from "@/components/button";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
  const { setSession } = useSpotifySession();
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  const onClickSpotifyLogin = async () => {
    const clientId = String(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID);
    const redirectUri = String(process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI);

    const data = await generateUrlAuthCodeFlow({
      clientId,
      redirectUri,
    });

    setSession({ codeVerifier: data.codeVerifier });
    setRedirectUrl(data.url);
  };

  if (redirectUrl) {
    redirect(redirectUrl);
  }

  return (
    <main className="p-2">
      <Button label="spotify login" onClick={onClickSpotifyLogin} />
    </main>
  );
};

export default HomePage;
