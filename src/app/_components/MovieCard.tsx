import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Film, Star } from "lucide-react";
import Link from "next/link";
import { Movie } from "@/lib/types";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  const baseImgUrl = "https://image.tmdb.org/t/p/w500/";
  const posterUrl = movie.poster_path ? baseImgUrl + movie.poster_path : null;

  return (
    <Link href={`/movie/${movie.id}`} className="block h-full">
      <Card className="h-full overflow-hidden rounded-[20px] border-border/60 bg-card/95 p-0 shadow-sm transition-transform hover:-translate-y-1">
        <CardContent className="relative aspect-[2/3] p-0">
          {posterUrl ? (
            <Image
              alt={movie.title}
              src={posterUrl}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-zinc-900 text-zinc-300">
              <Film className="size-10 text-zinc-500" />
              <p className="px-4 text-center text-sm font-medium">{movie.title}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex min-h-24 flex-col items-start gap-2 px-3 py-3 sm:px-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star fill="#FFEE58" className="size-4 text-yellow-400" />
            <p>{movie.vote_average.toFixed(1)}/10</p>
          </div>
          <h3 className="line-clamp-2 text-base font-medium leading-snug">
            {movie.title}
          </h3>
        </CardFooter>
      </Card>
    </Link>
  );
};
