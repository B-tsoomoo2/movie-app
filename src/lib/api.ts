import { Movie, MovieResponse } from "./types";
import { ReactNode } from "react";
const nowplaying = "/movie/now_playing?language=en-US&page=1";
const baseUrl = "https://api.themoviedb.org/3";
const MAX_COLLECTION_PAGES = 10;
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjIwODVjMDc2YTJkM2NhMGE1ZWRmZjg3M2FlNGY2OCIsIm5iZiI6MTc3MDA5Mjc4Mi4xNzIsInN1YiI6IjY5ODE3OGVlNmVmZjYwOGE1OTgxYzE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h-9gDt_16V3adBqdki3h1Zo_vrWzLBemMXH1qZlzBP8";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const getMovieCollection = async (path: string): Promise<MovieResponse> => {
  const response = await fetch(`${baseUrl}${path}`, options);
  const data = await response.json();

  return {
    page: data.page ?? 1,
    results: data.results ?? [],
    total_pages: Math.min(data.total_pages ?? 1, MAX_COLLECTION_PAGES),
    total_results: data.total_results ?? data.results?.length ?? 0,
  };
};

export interface Videos {
  id: number;
  results: VideoResult[];
}

export interface VideoResult {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export const getTrailer = async (movieId: string): Promise<Videos> => {
  const response = await fetch(
    `${baseUrl}/movie/${movieId}/videos?language=en-US}`,
    options,
  );
  // https://api.themoviedb.org/3/$/movie/${id}/videos?language=en-US
  // https://api.themoviedb.org/3/movie/${id}/videos?language=en-US
  const data = await response.json();
  console.log("data trailer", data);

  return data;
};

// export const getTrailer = async (movieId: string): Promise<Videos[]> => {
//   const response = await fetch(
//     `${baseUrl}/movie/${movieId}/videos?language=en-US}`,
//     options,
//   );

//   const data = await response.json();
//   console.log(data);
//   return data;
// };

export const getUpComingPage = async (page = 1): Promise<MovieResponse> => {
  return getMovieCollection(`/movie/upcoming?language=en-US&page=${page}`);
};

export const getUpComing = async (): Promise<Movie[]> => {
  const data = await getUpComingPage();

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
  credit: ReactNode;
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: unknown;
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
  // console.log("data", data);

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
  const data = await getPopularPage();

  return data.results;
};

export const getPopularPage = async (page = 1): Promise<MovieResponse> => {
  return getMovieCollection(`/movie/popular?language=en-US&page=${page}`);
};

export const getTopRated = async (): Promise<Movie[]> => {
  const data = await getTopRatedPage();

  return data.results;
};

export const getTopRatedPage = async (page = 1): Promise<MovieResponse> => {
  return getMovieCollection(`/movie/top_rated?language=en-US&page=${page}`);
};
export const getNowPlaying = async (): Promise<Movie[]> => {
  const response = await fetch(`${baseUrl}${nowplaying}`, options);
  const data = await response.json();

  return data.results;
};

export const getSimilarMoviesPage = async (
  movieId: string,
  page = 1,
): Promise<MovieResponse> => {
  const response = await fetch(
    `${baseUrl}/movie/${movieId}/similar?language=en-US&page=${page}`,
    options,
  );

  const data = await response.json();

  return {
    page: data.page ?? 1,
    results: data.results ?? [],
    total_pages: Math.min(data.total_pages ?? 1, MAX_COLLECTION_PAGES),
    total_results: data.total_results ?? data.results?.length ?? 0,
  };
};

export const getSimilarMovies = async (movieId: string): Promise<Movie[]> => {
  const data = await getSimilarMoviesPage(movieId);

  return data.results;
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
export const searchMovies = async (SearchValue: string): Promise<Movielist> => {
  const response = await fetch(
    `${baseUrl}/search/movie?query=${SearchValue}&language=en-US`,
    options,
  );
  const data = await response.json();

  return data.results;
};

export interface Movielist {
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
