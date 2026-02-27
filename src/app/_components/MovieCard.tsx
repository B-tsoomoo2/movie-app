import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";
import { Movie } from "@/lib/types";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  const baseImgUrl = "https://image.tmdb.org/t/p/w500/";
  return (
    <Link href={`/movie/${movie.id}`}>
      <Card className="bg-muted p-0 w-39.5 md:w-57.5">
        <CardContent className="p-0 w-full h-58.5 relative">
          <img
            className="w-full h-full rounded-t-xl object-cover"
            alt={movie.title}
            src={baseImgUrl + movie.poster_path}
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-1 pb-2 items-start h-25">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              <Star fill="#FFEE58" className="text-yellow-400" />
              <p>{movie.vote_average.toFixed(1)}/10</p>
            </div>
            <h1>{movie.title}</h1>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
