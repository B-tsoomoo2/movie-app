"use client";

import { getPopularPage } from "@/lib/api";
import { MovieCollectionPage } from "../_components/MovieCollectionPage";

const PopularPage = () => {
  return <MovieCollectionPage title="Popular" fetchMovies={getPopularPage} eyebrow={""} description={""} emptyTitle={""} emptyDescription={""} />;
};

export default PopularPage;
  