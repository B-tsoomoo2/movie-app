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

export const searchMovie = async (searchValue: string) => {
  const response = await fetch(
    `${baseUrl}/search/movie?query=${encodeURIComponent(searchValue)}&language=en-US`,
    options,
  );
  const data = await response.json();

  return data;
};
