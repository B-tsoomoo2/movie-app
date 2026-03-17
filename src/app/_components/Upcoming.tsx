import { getUpComing } from "@/lib/api";

import { MovieSection } from "./MovieSection";

export const Upcoming = () => {
  return (
    <MovieSection
      title="Upcoming"
      href="/upcoming"
      fetchMovies={getUpComing}
      emptyTitle="Upcoming movies are unavailable"
      emptyDescription="The catalog did not return any upcoming titles right now."
    />
  );
};
