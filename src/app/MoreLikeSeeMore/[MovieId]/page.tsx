"use client";

import { getSimilarMoviesPage } from "@/lib/api";
import { Movie } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { MovieGrid } from "@/app/_components/MovieGrid";
import { PaginationControls } from "@/app/_components/PaginationControls";

export const MoreLikeSeeMore = () => {
  const movieId = useParams();
  const router = useRouter();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const id = String(movieId.MovieId);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  };

  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const response = await getSimilarMoviesPage(id, currentPage);

        if (isMounted) {
          setMovies(response.results);
          setTotalPages(Math.max(1, response.total_pages ?? 1));
        }
      } catch (error) {
        if (isMounted) {
          console.error(error);
          setMovies([]);
          setTotalPages(1);
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
  }, [currentPage, id]);

  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 md:px-6 md:py-10">
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

      <section className="p-4 md:p-6">
        <div className="mb-6 border-b border-border/60 pb-5">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                More Like This
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              {loading ? "Loading..." : `${movies.length} titles on this page`}
            </p>
          </div>
        </div>

        <MovieGrid
          movies={movies}
          loading={loading}
          emptyTitle="No similar movies found"
          emptyDescription="This title does not have enough related recommendations yet."
        />

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  );
};

export default MoreLikeSeeMore;
