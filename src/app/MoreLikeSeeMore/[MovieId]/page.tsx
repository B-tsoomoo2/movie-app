"use client";
import { MovieCard } from "@/app/_components/MovieCard";
import { getSimilarMovies } from "@/lib/api";
import { Movie } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const MoreLikeSeeMore = ({ movieId }: { movieId: string }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  console.log(movieId);

  useEffect(() => {
    const fetch = async () => {
      if (!movieId) return;
      const resp = await getSimilarMovies(movieId);
      setMovies(resp);
      console.log(resp);
    };
    fetch();
  }, [movieId]);
  return (
    <div>
      <h1 className="font-semibold text-2xl pl-7">More like this</h1>
      <div className=" p-4 flex flex-wrap  gap-4 justify-evenly">
        {movies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
    </div>
  );
};

export default MoreLikeSeeMore;
