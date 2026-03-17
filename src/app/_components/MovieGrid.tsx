import { Film } from "lucide-react";

import { Movie } from "@/lib/types";

import { MovieCard } from "./MovieCard";

type MovieGridProps = {
  movies: Movie[];
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  gridClassName?: string;
};

const skeletonItems = Array.from({ length: 10 });
const defaultGridClassName =
  "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

export const MovieGrid = ({
  movies,
  loading = false,
  emptyTitle = "No movies found",
  emptyDescription = "Try another search or pick a different collection.",
  gridClassName,
}: MovieGridProps) => {
  if (loading) {
    return (
      <div className={gridClassName ?? defaultGridClassName}>
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-[20px] border border-border/60 bg-card"
          >
            <div className="aspect-[2/3] animate-pulse bg-muted" />
            <div className="space-y-2 px-3 py-3 sm:px-4">
              <div className="h-4 w-16 animate-pulse rounded bg-muted" />
              <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center rounded-[28px] border border-dashed border-border/70 bg-card/60 px-6 py-12 text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
          <Film className="size-6" />
        </div>
        <h2 className="text-xl font-semibold">{emptyTitle}</h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          {emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className={gridClassName ?? defaultGridClassName}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
