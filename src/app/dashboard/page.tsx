"use client";
import { FC, useEffect, useState } from "react";

import { SessionState, useSpotifySession } from "@/hooks/useSpotifySession";
import { Spotify } from "@/lib/spotify/api";
import { Table } from "@/components/table";
import { Song, UIState } from "@/types";
import { DropdownItem } from "@/components/dropdownMenu/types";
import { redirect } from "next/navigation";

interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = ({}) => {
  const { session, setSession, sessionState } = useSpotifySession();

  const [songs, setSongs] = useState<Array<Song>>([]);
  const [state, setState] = useState<UIState>(UIState.loading);

  useEffect(() => {
    if (session !== null && sessionState === SessionState.success) {
      if (session.token === undefined) {
        retrieveAndSetToken();
      }
    }
  }, [sessionState]);

  useEffect(() => {
    if (session && session.token !== undefined) {
      getSavedTracks();
    }
  }, [session]);

  if (session === null && sessionState === SessionState.revalidate)
    return redirect("/");

  if (session === null && sessionState === SessionState.success)
    return redirect("/");

  if (session === null) return <div className="text-white">loading</div>;

  if (sessionState === SessionState.error)
    return <div className="text-white">error in session</div>;

  if (sessionState === SessionState.loading)
    return <div className="text-white">loading session</div>;

  const dropdownItems: Array<DropdownItem> = [
    {
      event: (id: number) => {},
      label: "Eliminar de tus me gusta",
    },
    {
      event: (id: number) => {},
      label: "Añadir a una playlist",
    },
  ];

  const spotify = new Spotify({
    clientId: String(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID),
    code: session.code!,
    codeVerifier: session.codeVerifier!,
    redirectUri: String(process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI),
  });

  const retrieveAndSetToken = async () => {
    const token = await spotify.getToken();

    if (token instanceof Error) {
      setState(UIState.error);
      return console.error(token);
    }

    const now = new Date();
    const expiresDate = now.getTime() + 3600000; // 1hr

    setSession({ ...session, token, expires: new Date(expiresDate) });
  };

  const getFirstSavedTracks = async () => {
    try {
      const result = await spotify.getSavedTracks({
        token: session.token!,
        limit: 50,
        offset: 0,
      });
    } catch (error) {
      console.error(error);
      setState(UIState.error);
    }
  };

  const getSavedTracks = async () => {
    try {
      const result = await spotify.getSavedTracks({
        token: session.token!,
        limit: 50,
        offset: 0,
      });

      if (result instanceof Error) {
        setState(UIState.error);
        return console.error(result);
      }

      const tempSongs = result.items.map<Song>((item, index) => {
        const artist: string = item.track.artists
          .map<string>((ar) => ar.name)
          .join(", ");

        return {
          album: item.track.album.name,
          artist,
          date: new Date(item.added_at),
          duration: item.track.duration_ms,
          genre: "test",
          id: index + 1,
          image: item.track.album.images[0].url,
          rating: 0,
          title: item.track.name,
        };
      });

      setSongs(tempSongs);
      setState(UIState.success);
    } catch (error) {
      console.error(error);
      setState(UIState.error);
    }
  };

  const onClickRating = (id: number, rating: number) => {
    const song = songs.find((s) => s.id === id);

    if (song) {
      let newSongs = songs.map((song) => {
        if (song.id === id) {
          return {
            ...song,
            rating,
          };
        }

        return song;
      });

      setSongs(newSongs);
    }
  };

  return (
    <main className="flex flex-col items-start w-full">
      <Table
        songs={songs}
        state={state}
        dropdownItems={dropdownItems}
        onClickRating={onClickRating}
      />
    </main>
  );
};

export default DashboardPage;
