"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { getMoviesByGenre } from "@/lib/genres";
import { searchMoviesByPage } from "@/lib/search-results";
import { Movie } from "@/lib/types";

import { GenrePillList } from "./GenrePillList";
import { MovieGrid } from "./MovieGrid";

export const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const activeQuery = urlQuery.trim();
  const urlGenreId = searchParams.get("genre") ?? "";
  const activeGenreId = Number(urlGenreId);
  const activeGenreName = searchParams.get("genreName")?.trim() ?? "";
  const pageValue = Number(searchParams.get("page") ?? "1");
  const currentPage = Number.isFinite(pageValue) && pageValue > 0 ? pageValue : 1;
  const hasGenreSelection = Number.isFinite(activeGenreId) && activeGenreId > 0;
  const hasSearchSelection = Boolean(activeQuery) && !hasGenreSelection;
  const hasSelection = hasGenreSelection || hasSearchSelection;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!hasSelection) {
      return;
    }

    let isMounted = true;

    const loadMovies = async () => {
      setLoading(true);

      try {
        const response = hasGenreSelection
          ? await getMoviesByGenre(String(activeGenreId), currentPage)
          : await searchMoviesByPage(activeQuery, currentPage);

        if (isMounted) {
          setMovies(response.results ?? []);
          setTotalPages(response.total_pages ?? 1);
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

    loadMovies();

    return () => {
      isMounted = false;
    };
  }, [activeGenreId, activeQuery, currentPage, hasGenreSelection, hasSelection]);

  const buildPageHref = (page: number) => {
    if (hasGenreSelection) {
      return `/searchedpage?genre=${activeGenreId}&genreName=${encodeURIComponent(activeGenreName)}&page=${page}`;
    }

    return `/searchedpage?q=${encodeURIComponent(activeQuery)}&page=${page}`;
  };

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col px-4 py-6 md:px-6 md:py-10">
      <section className="rounded-[32px] border border-white/10 bg-[#0b0b0f] text-white shadow-2xl">
        <div className="border-b border-white/10 px-6 py-5 md:px-8">
          <h1 className="text-3xl font-semibold tracking-tight md:text-[44px]">
            Search results
          </h1>
        </div>

        <div className="grid gap-8 px-6 py-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
          <div className="order-2 space-y-6 lg:order-1 lg:border-r lg:border-white/10 lg:pr-8">
            {hasGenreSelection ? (
              <div className="flex items-center justify-between gap-3">
                <p className="text-xl font-semibold tracking-tight md:text-[34px]">
                  {loading ? "Loading..." : activeGenreName || "Genre"}
                </p>
                <Link
                  href="/searchedpage"
                  className="text-sm font-medium text-white/72 transition hover:text-white"
                >
                  Clear genre
                </Link>
              </div>
            ) : hasSearchSelection ? (
              <p className="text-xl font-semibold tracking-tight md:text-[34px]">
                {loading ? "Loading..." : `${movies.length} results for`}{" "}
                <span className="font-bold">“{activeQuery}”</span>
              </p>
            ) : (
              <p className="text-xl font-semibold tracking-tight md:text-[34px]">
                Search for a movie
              </p>
            )}

            <MovieGrid
              movies={hasSelection ? movies : []}
              loading={hasSelection ? loading : false}
              gridClassName="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4"
              emptyTitle={
                hasGenreSelection
                  ? `No ${activeGenreName.toLowerCase() || "genre"} movies yet`
                  : hasSearchSelection
                  ? "No matching movies yet"
                  : "Search for a movie to see results"
              }
              emptyDescription={
                hasGenreSelection
                  ? "Choose another genre from the right side."
                  : hasSearchSelection
                  ? "Try a different title or a shorter keyword."
                  : "Use the search bar above to start browsing."
              }
            />

            {hasSelection && totalPages > 0 ? (
              <Pagination className="justify-center border-t border-white/10 pt-6">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href={buildPageHref(Math.max(1, currentPage - 1))}
                      className={cn(
                        "border border-transparent text-white hover:bg-white/6 hover:text-white",
                        currentPage === 1 && "pointer-events-none opacity-30",
                      )}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href={buildPageHref(currentPage)}
                      isActive
                      className="border-white/12 bg-transparent text-white hover:bg-white/6 hover:text-white"
                    >
                      {currentPage}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href={buildPageHref(
                        Math.min(Math.max(totalPages, 1), currentPage + 1),
                      )}
                      className={cn(
                        "border border-transparent text-white hover:bg-white/6 hover:text-white",
                        currentPage >= totalPages &&
                          "pointer-events-none opacity-30",
                      )}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            ) : null}
          </div>

          <aside className="order-1 space-y-3 pt-1 lg:order-2">
            <h2 className="text-2xl font-semibold tracking-tight md:text-[34px]">
              Search by genre
            </h2>
            <p className="text-lg text-white/72">See lists of movies by genre</p>
            <GenrePillList
              activeGenreId={hasGenreSelection ? activeGenreId : null}
              hrefBuilder={(genre) =>
                genre.id === activeGenreId
                  ? "/searchedpage"
                  : {
                      pathname: "/searchedpage",
                      query: {
                        genre: genre.id,
                        genreName: genre.name,
                        page: 1,
                      },
                    }
              }
              containerClassName="flex flex-wrap gap-3 pt-4"
              pillClassName="h-8 px-3 text-[15px]"
            />
          </aside>
        </div>
      </section>
    </main>
  );
};
