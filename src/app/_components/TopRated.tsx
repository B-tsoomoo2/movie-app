import { getTopRated } from "@/lib/api";

import { MovieSection } from "./MovieSection";

export const TopRated = () => {
  return (
    <MovieSection
      title="Top Rated"
      href="/topRated"
      fetchMovies={getTopRated}
      emptyTitle="Top rated movies are unavailable"
      emptyDescription="The catalog did not return any top rated titles right now."
    />
  );
};
