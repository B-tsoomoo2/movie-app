"use client";
import { getTopRated } from "@/lib/api";
import { Movie } from "@/lib/types";
import { useEffect, useState } from "react";
import { MovieCard } from "../_components/MovieCard";
const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const resp = await getTopRated();
      setMovies(resp);
    };
    fetch();
  }, []);
  return (
    <div>
      <h1 className="font-semibold text-2xl pl-7">Upcoming</h1>
      <div className="p-4 flex flex-wrap  gap-4 justify-evenly">
        {movies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
    </div>
  );
};

export default Home;
