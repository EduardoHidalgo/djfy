export enum UIState {
  error = "error",
  loading = "loading",
  success = "success",
}

export interface Song {
  id: number;
  title: string;
  image: string;
  date: Date;
  rating: number;
  duration: number;
  genre: string;
  album: string;
  artist: string;
}
