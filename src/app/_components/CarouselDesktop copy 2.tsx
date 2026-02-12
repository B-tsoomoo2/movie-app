"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getNowPlaying } from "@/lib/api";
import { Movie } from "@/lib/types";
export const CarouselDesktop = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const resp = await getNowPlaying();
      setMovies(resp);
    };
    fetch();
  }, []);
  const baseImgUrl = "https://image.tmdb.org/t/p/w500/";
  return (
    <Carousel className="w-full hidden md:block">
      <CarouselContent>
        {movies.map((movie) => (
          <CarouselItem key={movie.id}>
            <div className="w-full relative">
              <div className="w-full h-150 flex flex-col aspect-square items-center justify-center">
                <img
                  src={baseImgUrl + movie.poster_path}
                  className="w-full h-full object-cover"
                />

                <div className="flex flex-col gap-4 px-5 py-3 md:absolute top-35 left-35 md:text-white ">
                  <div className="flex  justify-between items-center md:flex-col md:gap-1">
                    <h1 className="flex flex-col text-[14px] ">
                      Now Playing:
                      <span className="font-semibold text-[24px] leading-8 md:w-[404px]">
                        {movie.title}
                      </span>
                    </h1>
                    <div className="flex md:pl-7 gap-1">
                      <Star fill="#FFEE58" className="text-yellow-400  " />
                      <p className="font-semibold md:w-[404px]">
                        {movie.vote_average.toFixed(1)}
                        <span className="text-base font-normal ">/10</span>
                      </p>
                    </div>
                  </div>
                  <h1 className="md:w-75.5 ">{movie.overview}</h1>
                  <div>
                    <Button className="w-36.25 h-10 md:bg-white md:text-black ">
                      <Play />
                      <p>Watch Trailer</p>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="z-100 top-1/2 left-5 -translate-y-1/2 hidden md:block" />
      <CarouselNext className="top-1/2 right-5 -translate-y-1/2 z-100 hidden md:block" />
    </Carousel>
  );
};
