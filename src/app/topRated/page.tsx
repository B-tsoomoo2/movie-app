"use client";

import { getTopRatedPage } from "@/lib/api";
import { MovieCollectionPage } from "../_components/MovieCollectionPage";

const TopRatedPage = () => {
  return (
    <MovieCollectionPage
      title="Top Rated"
      fetchMovies={getTopRatedPage}
      eyebrow={""}
      description={""}
      emptyTitle={""}
      emptyDescription={""}
    />
  );
};

export default TopRatedPage;
