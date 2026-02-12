"use client";
import { METHODS } from "http";
import { CarouselDesktop } from "./_components/CarouselDesktop";
import { CarouselMobile } from "./_components/CarouselMobile";
// import { Header } from "./_components/Header";
import { MobileHeader } from "./_components/MobileHeader";
import { MovieCard } from "./_components/MovieCard";
import { Upcoming } from "./_components/Upcoming";
// import { headers } from "next/headers";
import { useEffect, useState } from "react";
import { getPopular, getUpComing } from "@/lib/api";
import { Movie } from "@/lib/types";
import { Popular } from "./_components/Popular";
import { TopRated } from "./_components/TopRated";

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const resp = await getUpComing();
      setMovies(resp);
    };
    fetch();
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="flex justify-center">
        <CarouselMobile />
        <CarouselDesktop />
      </div>

      {/* <MovieCarousel /> */}
      <div className="max-w-500 flex flex-col">
        <div className="px-5 py-3">
          <Upcoming />
        </div>
        {/* <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 "> */}
        <div className="p-4 flex flex-wrap  gap-4 justify-evenly">
          {movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </div>
        <Popular />
        <TopRated />
      </div>
    </div>
  );
};

export default Home;
