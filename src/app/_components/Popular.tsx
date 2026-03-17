"use client";
import { getPopular } from "@/lib/api";

import { MovieSection } from "./MovieSection";

export const Popular = () => {
  return (
    <MovieSection
      title="Popular"
      href="/popular"
      fetchMovies={getPopular}
      emptyTitle="Popular movies are unavailable"
      emptyDescription="The catalog did not return any popular titles right now."
    />
  );
};
