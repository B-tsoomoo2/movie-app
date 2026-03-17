import { Movie } from "./types";

const baseUrl = "https://api.themoviedb.org/3";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjIwODVjMDc2YTJkM2NhMGE1ZWRmZjg3M2FlNGY2OCIsIm5iZiI6MTc3MDA5Mjc4Mi4xNzIsInN1YiI6IjY5ODE3OGVlNmVmZjYwOGE1OTgxYzE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h-9gDt_16V3adBqdki3h1Zo_vrWzLBemMXH1qZlzBP8";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export type MovieGenre = {
  id: number;
  name: string;
};

type GenreResponse = {
  genres: MovieGenre[];
};

type DiscoverMoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export const getMovieGenres = async (): Promise<MovieGenre[]> => {
  const response = await fetch(`${baseUrl}/genre/movie/list?language=en`, options);
  const data: GenreResponse = await response.json();

  return data.genres ?? [];
};

export const getMoviesByGenre = async (
  genreId: string,
  page = 1,
): Promise<DiscoverMoviesResponse> => {
  const response = await fetch(
    `${baseUrl}/discover/movie?include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`,
    options,
  );
  const data: DiscoverMoviesResponse = await response.json();

  return data;
};
