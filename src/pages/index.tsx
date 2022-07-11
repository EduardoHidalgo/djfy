import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { User } from "@prisma/client";

interface QueryParams {
  result: "success" | "failure";
  user: string;
}

interface HomePageProps {
  user: User | null;
  error: string | null;
}

const HomePage: NextPage<HomePageProps> = ({ user, error }: HomePageProps) => {
  const baseUri = "http://localhost:3000/api/spotify";
  const router = useRouter();

  useEffect(() => {
    if (user) {
      getTracks();
      //getPlaylists();
    }
  }, [user]);

  useEffect(() => {
    if (error && error === "no queries provided") {
      router.push("/api/authorize");
    }
  }, [error]);

  const getTracks = async () => {
    const data = await fetch(
      `${baseUri}/get-liked-tracks?accessToken=${user?.accessToken}&refreshToken=${user?.refreshToken}`
    );

    if (data.status === 401) {
      router.push("/api/authorize");
    }

    if (data.status === 403) {
      router.push("/api/authorize");
    }

    const likedTracks = (await data.json()) as
      | SpotifyApi.UsersSavedTracksResponse
      | Error;

    console.log({ likedTracks });
  };

  const getPlaylists = async () => {
    const data = await fetch(
      `${baseUri}/get-playlists?accessToken=${user?.accessToken}&refreshToken=${user?.refreshToken}`
    );
    const playlists = (await data.json()) as
      | SpotifyApi.ListOfUsersPlaylistsResponse
      | Error;

    console.log({ playlists });
  };

  if (error) return <div>{error}</div>;
  if (!user) return <div>no user logged</div>;
  return <div>{user?.displayName}</div>;
};

export default HomePage;

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  context
) => {
  const query = context.query as unknown as QueryParams;

  if (query.result === "success") {
    const result: User | Error = await fetch(
      `http://localhost:3000/api/core/get-user?user=${query.user}`
    ).then((res) => res.json());

    if (result instanceof Error) {
      return {
        props: {
          error: result.message,
          user: null,
        },
      };
    }

    return {
      props: {
        user: result,
        error: null,
      },
    };
  }

  return {
    props: {
      user: null,
      error: "no queries provided",
    },
  };
};
