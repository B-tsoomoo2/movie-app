import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Film, Star } from "lucide-react";
import Link from "next/link";
import { Movie } from "@/lib/types";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  const baseImgUrl = "https://image.tmdb.org/t/p/w500/";
  const posterUrl = movie.poster_path ? baseImgUrl + movie.poster_path : null;

  return (
    <Link href={`/movie/${movie.id}`}>
      <Card className="bg-muted p-0 w-39.5 overflow-hidden md:w-57.5">
        <CardContent className="p-0 w-full h-58.5 relative">
          {posterUrl ? (
            <Image
              alt={movie.title}
              src={posterUrl}
              fill
              sizes="(max-width: 768px) 158px, 230px"
              className="rounded-t-xl object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-t-xl bg-zinc-900 text-zinc-300">
              <Film className="size-10 text-zinc-500" />
              <p className="px-4 text-center text-sm font-medium">{movie.title}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex h-25 flex-col items-start gap-1 pb-2">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              <Star fill="#FFEE58" className="text-yellow-400" />
              <p>{movie.vote_average.toFixed(1)}/10</p>
            </div>
            <h1 className="line-clamp-2">{movie.title}</h1>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
