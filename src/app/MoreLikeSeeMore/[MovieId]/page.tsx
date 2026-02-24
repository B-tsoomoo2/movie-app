"use client";

import { MovieCard } from "@/app/_components/MovieCard";
import { getSimilarMovies, getTrailer } from "@/lib/api";
import { Movie } from "@/lib/types";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const MoreLikeSeeMore = () => {
  let movieId = useParams();

  const [movies, setMovies] = useState<Movie[]>([]);

  const id = String(movieId.MovieId);
  // console.log("id", id);

  useEffect(() => {
    const fetch = async () => {
      if (!id) return;
      const resp = await getSimilarMovies(id);
      setMovies(resp);
      // console.log(resp);
    };
    fetch();
  }, [id]);

 
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
