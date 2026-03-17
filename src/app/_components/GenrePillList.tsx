"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getMovieGenres, MovieGenre } from "@/lib/genres";

type GenreHref =
  | string
  | {
      pathname: string;
      query?: Record<string, string | number | undefined>;
    };

type GenrePillListProps = {
  containerClassName?: string;
  pillClassName?: string;
  loadingItemClassName?: string;
  emptyClassName?: string;
  activeGenreId?: number | null;
  hrefBuilder?: (genre: MovieGenre) => GenreHref;
};

export const GenrePillList = ({
  containerClassName,
  pillClassName,
  loadingItemClassName,
  emptyClassName,
  activeGenreId,
  hrefBuilder,
}: GenrePillListProps) => {
  const [genres, setGenres] = useState<MovieGenre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadGenres = async () => {
      setLoading(true);

      try {
        const response = await getMovieGenres();

        if (isMounted) {
          setGenres(response);
        }
      } catch (error) {
        if (isMounted) {
          console.error(error);
          setGenres([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadGenres();

    return () => {
      isMounted = false;
    };
  }, []);

  const itemsClassName =
    containerClassName ?? "grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-5";

  if (!loading && genres.length === 0) {
    return (
      <p className={cn("py-6 text-center text-sm text-white/56", emptyClassName)}>
        Genres could not be loaded right now.
      </p>
    );
  }

  return (
    <div className={itemsClassName}>
      {loading
        ? Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-10 animate-pulse rounded-full bg-white/8",
                loadingItemClassName,
              )}
            />
          ))
        : genres.map((genre) => (
            <Badge
              key={genre.id}
              asChild
              variant="outline"
              className={cn(
                "h-10 justify-between rounded-full border-white/12 bg-transparent px-4 text-sm font-medium text-white transition hover:bg-white/6 hover:text-white",
                activeGenreId === genre.id && "border-primary/40 bg-white/10",
                pillClassName,
              )}
            >
              <Link
                href={
                  hrefBuilder?.(genre) ?? {
                    pathname: `/genre/${genre.id}`,
                    query: { name: genre.name },
                  }
                }
              >
                <span>{genre.name}</span>
                <ChevronRight className="size-4" />
              </Link>
            </Badge>
          ))}
    </div>
  );
};
