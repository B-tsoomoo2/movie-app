"use client";
import { CarouselDesktop } from "./_components/CarouselDesktop";
import { CarouselMobile } from "./_components/CarouselMobile";
import { Upcoming } from "./_components/Upcoming";
import { Popular } from "./_components/Popular";
import { TopRated } from "./_components/TopRated";

const Home = () => {
  return (
    <div className="mx-auto max-w-[1440px]">
      <div className="flex justify-center">
        <CarouselMobile />
        <CarouselDesktop />
      </div>

      <div className="flex flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
        <Upcoming />
        <Popular />
        <TopRated />
      </div>
    </div>
  );
};

export default Home;
