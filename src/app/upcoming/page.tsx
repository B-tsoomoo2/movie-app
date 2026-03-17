"use client";

import { getUpComing } from "@/lib/api";
import { MovieCollectionPage } from "../_components/MovieCollectionPage";

const UpcomingPage = () => {
  return (
    <MovieCollectionPage
      eyebrow="Coming soon"
      title="Upcoming"
      description="Movies that are scheduled to arrive soon, collected into one full-page list."
      emptyTitle="Upcoming movies are unavailable"
      emptyDescription="The catalog did not return any upcoming titles right now."
      fetchMovies={getUpComing}
    />
  );
};

export default UpcomingPage;
