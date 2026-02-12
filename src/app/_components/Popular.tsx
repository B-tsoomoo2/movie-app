"use client";
import { useEffect, useState } from "react";
import { Movie } from "@/lib/types";
import { getPopular } from "@/lib/api";
import { MovieCard } from "./MovieCard";
import { ArrowRight, Link } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export const Popular = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const resp = await getPopular();
      setMovies(resp);
    };
    fetch();
  }, []);
  const router = useRouter();
  const pushToPopularPage = () => {
    router.push("/popular");
  };
  return (
    <div>
      <div className="flex justify-between items-center ">
        <h3 className="font-semibold text-2xl pl-8">Popular</h3>

        <Button variant="link" onClick={pushToPopularPage}>
          See more
          <ArrowRight />
        </Button>
      </div>
      <div className="p-4 flex flex-wrap  gap-4 justify-evenly">
        {movies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
    </div>
  );
};
