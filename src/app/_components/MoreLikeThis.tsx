"use client";

import { useEffect, useState } from "react";
import { Movie } from "@/lib/types";
import { getSimilarMovies } from "@/lib/api";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { MovieGrid } from "./MovieGrid";

export const MoreLikeThis = ({ movieId }: { movieId: string }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  // console.log("movie id:", movieId);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      if (!movieId) return;

      setLoading(true);
      try {
        const resp = await getSimilarMovies(movieId);
        setMovies(resp.slice(0, 10));
      } catch (error) {
        console.error("Error fetching similar movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarMovies();
  }, [movieId]);

  return (
    <section className="p-4 md:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold tracking-tight">More Like This</h2>
        <div className="flex items-center gap-2">
          <Link
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition hover:bg-accent"
            href={`/MoreLikeSeeMore/${movieId}`}
          >
            <span>See more</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <MovieGrid
        movies={movies}
        loading={loading}
        emptyTitle="No similar movies found"
        emptyDescription="This title does not have enough related recommendations yet."
      />
    </section>
  );
};
