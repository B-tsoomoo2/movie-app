"use client";

import { getTopRated } from "@/lib/api";
import { MovieCollectionPage } from "../_components/MovieCollectionPage";

const TopRatedPage = () => {
  return (
    <MovieCollectionPage
      eyebrow="Highest scores"
      title="Top Rated"
      description="The strongest-rated movies from the catalog, expanded into a full-page view."
      emptyTitle="Top rated movies are unavailable"
      emptyDescription="The catalog did not return any top rated titles right now."
      fetchMovies={getTopRated}
    />
  );
};

export default TopRatedPage;
