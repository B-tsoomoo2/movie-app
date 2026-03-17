import { notFound } from "next/navigation";

import { MovieGrid } from "@/app/_components/MovieGrid";
import { getMovieGenres, getMoviesByGenre } from "@/lib/genres";

type GenrePageProps = {
  params: Promise<{ genreId: string }>;
  searchParams: Promise<{ name?: string }>;
};

export default async function GenrePage({
  params,
  searchParams,
}: GenrePageProps) {
  const { genreId } = await params;
  const { name } = await searchParams;

  if (!genreId || Number.isNaN(Number(genreId))) {
    notFound();
  }

  const [genres, moviesResponse] = await Promise.all([
    getMovieGenres(),
    getMoviesByGenre(genreId),
  ]);

  const selectedGenre = genres.find((genre) => genre.id === Number(genreId));
  const genreName = name ?? selectedGenre?.name ?? "Genre";

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-6 md:py-10">
      <section className="px-1 pt-2">
        <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
          {genreName}
        </h1>
      </section>

      <section className="rounded-[32px] border border-border/60 bg-card/60 p-4 md:p-6">
        <MovieGrid
          movies={moviesResponse.results}
          emptyTitle={`No ${genreName.toLowerCase()} movies found`}
          emptyDescription="Try another genre from the list above."
        />
      </section>
    </main>
  );
}
