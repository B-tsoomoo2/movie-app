"use client";

import { getSimilarMovies } from "@/lib/api";
import { Movie } from "@/lib/types";
import { Clapperboard } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { MovieGrid } from "@/app/_components/MovieGrid";
import { PageHero } from "@/app/_components/PageHero";

export const MoreLikeSeeMore = () => {
  const movieId = useParams();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const id = String(movieId.MovieId);

  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const response = await getSimilarMovies(id);

        if (isMounted) {
          setMovies(response);
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

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 md:px-6 md:py-10">
      <PageHero
        eyebrow="Related titles"
        title="More like this"
        description="A full-page view for similar recommendations based on the movie you opened."
        aside={
          <div className="rounded-[28px] border border-white/12 bg-white/8 p-5 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/12 p-3">
                <Clapperboard className="size-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/56">
                  Recommendations
                </p>
                <p className="mt-1 text-lg font-semibold">
                  {loading ? "Loading titles..." : `${movies.length} matches`}
                </p>
              </div>
            </div>
          </div>
        }
      />

      <section className="rounded-[32px] border border-border/60 bg-card/60 p-4 md:p-6">
        <MovieGrid
          movies={movies}
          loading={loading}
          emptyTitle="No similar movies found"
          emptyDescription="This title does not have enough related recommendations yet."
        />
      </section>
    </main>
  );
};

export default MoreLikeSeeMore;
