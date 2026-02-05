"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CarouselMobile = () => {
  const carousel = [
    {
      id: 1,
      image:
        "https://image.tmdb.org/t/p/original/6izwz7rsy95ARzTR3poZ8H6c5pp.jpg",
    },
    {
      id: 2,
      image:
        "https://image.tmdb.org/t/p/original/6izwz7rsy95ARzTR3poZ8H6c5pp.jpg",
    },
    {
      id: 3,
      image:
        "https://image.tmdb.org/t/p/original/6izwz7rsy95ARzTR3poZ8H6c5pp.jpg",
    },
  ];

  return (
    <Carousel className="w-full relative block md:hidden">
      <CarouselContent>
        {carousel.map((movie) => (
          <CarouselItem key={movie.id}>
            <div className="w-full">
              <div className="w-full flex flex-col aspect-square items-center justify-center">
                <span></span>
                <img src={movie.image} className="w-full h-61.5 object-cover" />
                <div className="flex flex-col gap-4 px-5 py-3 md:absolute top-35 md:text-white">
                  <div className="flex  justify-between items-center md:flex-col md:gap-1">
                    <h1 className="flex flex-col text-[14px] ">
                      Now Playing:
                      <span className="font-semibold text-[24px] leading-8 md:w-[404px]">
                        Wicked
                      </span>
                    </h1>x  
                    <div className="flex md:pl-7 gap-1">
                      <Star fill="#FFEE58" className="text-yellow-400  " />
                      <p className="font-semibold md:w-[404px]">
                        6.9
                        <span className="text-base text-gray-400 font-normal ">
                          /10
                        </span>
                      </p>
                    </div>
                  </div>
                  <h1 className="md:w-75.5 md:pl-7">
                    Elphaba, a misunderstood young woman because of her green
                    skin, and Glinda, a popular girl, become friends at Shiz
                    University in the Land of Oz. After an encounter with the
                    Wonderful Wizard of Oz, their friendship reaches a
                    crossroads.
                  </h1>
                  <div className="md:pl-7">
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
      <CarouselPrevious className="z-100 top-1/2 left-20 -translate-y-1/2 hidden md:block" />
      <CarouselNext className="top-1/2 right-20 -translate-y-1/2 z-100 hidden md:block" />
    </Carousel>
  );
};
