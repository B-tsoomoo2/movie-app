import path from "path";
import { Movie } from "./types";
const nowplaying = "/movie/now_playing?language=en-US&page=1";
const topRatedurl = "/movie/top_rated?language=en-US&page=1";
const baseUrl = "https://api.themoviedb.org/3";
const popularUrl = "/movie/popular?language=en-US&page=1";
const upcomingUrl = "/movie/upcoming?language=en-US&page=1";
const crewUrl = " /movie/${id}/credits?language=en-US";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjIwODVjMDc2YTJkM2NhMGE1ZWRmZjg3M2FlNGY2OCIsIm5iZiI6MTc3MDA5Mjc4Mi4xNzIsInN1YiI6IjY5ODE3OGVlNmVmZjYwOGE1OTgxYzE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h-9gDt_16V3adBqdki3h1Zo_vrWzLBemMXH1qZlzBP8";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const getUpComing = async (): Promise<Movie[]> => {
  const response = await fetch(`${baseUrl}${upcomingUrl}`, options);
  const data = await response.json();

  return data.results;
};
export const getMovieById = async (movieId: string): Promise<MovieDetaits> => {
  const response = await fetch(
    `${baseUrl}/movie/${movieId}?language=en-US`,
    options,
  );
  const data = await response.json();

  return data;
};

export interface MovieDetaits {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export const getCrew = async (movieId: string): Promise<crewDetails> => {
  const response = await fetch(
    `${baseUrl}/movie/${movieId}/credits?language=en-US`,
    options,
  );
  const data = await response.json();
  console.log("data", data);

  return data;
};

export interface crewDetails {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  credit_id: string;
  department: string;
  job: string;
}
export const getPopular = async (): Promise<Movie[]> => {
  const response = await fetch(`${baseUrl}${popularUrl}`, options);
  const data = await response.json();

  return data.results;
};
export const getTopRated = async (): Promise<Movie[]> => {
  const response = await fetch(`${baseUrl}${topRatedurl}`, options);
  const data = await response.json();

  return data.results;
};
export const getNowPlaying = async (): Promise<Movie[]> => {
  const response = await fetch(`${baseUrl}${nowplaying}`, options);
  const data = await response.json();

  return data.results;
};

export const getSimilarMovies = async (movieId: string): Promise<Movie[]> => {
  const response = await fetch(
    `${baseUrl}/movie/${movieId}/similar?language=en-US`,
    options,
  );

  const data = await response.json();

  return data.results ?? [];
};

export interface MoreLikeThis {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
