"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Movie } from "@/lib/types";

import { MovieGrid } from "./MovieGrid";
import { PageHero } from "./PageHero";

type MovieCollectionPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  emptyTitle: string;
  emptyDescription: string;
  fetchMovies: () => Promise<Movie[]>;
};

export const MovieCollectionPage = ({
  eyebrow,
  title,
  description,
  emptyTitle,
  emptyDescription,
  fetchMovies,
}: MovieCollectionPageProps) => {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  };

  useEffect(() => {
    let isMounted = true;

    const loadMovies = async () => {
      setLoading(true);

      try {
        const response = await fetchMovies();

        if (isMounted) {
          setMovies(response ?? []);
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
  }, [fetchMovies]);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 md:px-6 md:py-10">
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        aside={
          <div className="flex justify-start md:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoBack}
              className="h-11 rounded-full border-white/16 bg-white/8 px-4 text-white hover:bg-white/16 hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>
          </div>
        }
      />
      <section className="rounded-[32px] border border-border/60 bg-card/60 p-4 md:p-6">
        <MovieGrid
          movies={movies}
          loading={loading}
          emptyTitle={emptyTitle}
          emptyDescription={emptyDescription}
        />
      </section>
    </main>
  );
};
