"use client";

import { getPopular } from "@/lib/api";
import { MovieCollectionPage } from "../_components/MovieCollectionPage";

const PopularPage = () => {
  return (
    <MovieCollectionPage
      eyebrow="Trending now"
      title="Popular"
      description="A full-page list of the movies currently drawing the most attention."
      emptyTitle="Popular movies are unavailable"
      emptyDescription="The catalog did not return any popular titles right now."
      fetchMovies={getPopular}
    />
  );
};

export default PopularPage;
