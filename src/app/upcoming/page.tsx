"use client";

import { getUpComingPage } from "@/lib/api";
import { MovieCollectionPage } from "../_components/MovieCollectionPage";

const UpcomingPage = () => {
  return <MovieCollectionPage title="Upcoming" fetchMovies={getUpComingPage} />;
};

export default UpcomingPage;
