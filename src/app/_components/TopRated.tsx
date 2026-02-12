import { useEffect, useState } from "react";
import { Movie } from "@/lib/types";
import { MovieCard } from "./MovieCard";
import { getTopRated } from "@/lib/api";
import { ArrowRight, Link } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const TopRated = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const resp = await getTopRated();
      setMovies(resp);
    };
    fetch();
  }, []);
  const router = useRouter();
  const pushToTopRatedPage = () => {
    router.push("/topRated");
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-2xl pl-8">Top Rated</h3>
        <Button variant="link" onClick={pushToTopRatedPage}>
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
