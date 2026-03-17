"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Movie } from "@/lib/types";

import { MovieGrid } from "./MovieGrid";

type MovieSectionProps = {
  title: string;
  href: string;
  fetchMovies: () => Promise<Movie[]>;
  emptyTitle?: string;
  emptyDescription?: string;
  limit?: number;
};

export const MovieSection = ({
  title,
  href,
  fetchMovies,
  emptyTitle = "No movies found",
  emptyDescription = "The catalog did not return any titles right now.",
  limit = 10,
}: MovieSectionProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadMovies = async () => {
      setLoading(true);

      try {
        const response = await fetchMovies();

        if (isMounted) {
          setMovies(response.slice(0, limit));
        }
      } catch (error) {
        if (isMounted) {
          console.error(error);
          setMovies([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMovies();

    return () => {
      isMounted = false;
    };
  }, [fetchMovies, limit]);

  return (
    <section className="p-4 md:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>

        <Link
          href={href}
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition hover:bg-accent"
        >
          <span>See more</span>
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <MovieGrid
        movies={movies}
        loading={loading}
        emptyTitle={emptyTitle}
        emptyDescription={emptyDescription}
      />
    </section>
  );
};
