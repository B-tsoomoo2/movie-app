"use client";
import { useEffect, useState } from "react";
import { Movie } from "@/lib/types";
import { MovieCard } from "./MovieCard";
import { getSimilarMovies } from "@/lib/api";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MoreLikeThis = ({ movieId }: { movieId: string }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      if (!movieId) return;

      setLoading(true);
      try {
        const resp = await getSimilarMovies(movieId);
        setMovies(resp.slice(0, 5));
      } catch (error) {
        console.error("Error fetching similar movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarMovies();
  }, [movieId]);

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-2xl pl-8">More Like This</h3>
        <div className="w-30 gap-2 flex items-center">
          <div>See more</div>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
      <div className="p-4 flex flex-wrap gap-4 justify-evenly">
        {movies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
    </div>
  );
};
