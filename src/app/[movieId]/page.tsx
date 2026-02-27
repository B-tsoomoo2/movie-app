import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";

import { getMovieById, getTrailer } from "@/lib/api";

import { Star } from "lucide-react";

import Image from "next/image";

import { getCrew } from "@/lib/api";

import { MoreLikeThis } from "../_components/MoreLikeThis";

export default async function Detail({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const { movieId } = await params;

  const data = await getMovieById(movieId);

  const imageUrl = "https://image.tmdb.org/t/p/w500";

  const crewData = await getCrew(movieId);

  const director = crewData.crew.find((person) => person.job === "Director");

  const writers = crewData.crew.filter(
    (person) =>
      person.job === "Writer" ||
      person.job === "Screenplay" ||
      person.job === "Story",
  );

  const stars = crewData.cast.slice(0, 3);

  const convertRunTimeToHours = (runtime: number) => {
    const hours = Math.floor(runtime / 60);

    const minutes = Math.floor(runtime % 60);

    return { hours, minutes };
  };

  const time = convertRunTimeToHours(data.runtime);

  const trailerData = await getTrailer(movieId);

  console.log(trailerData.results);

  const findOfficialTrailer = trailerData.results.find(
    (trailer) => trailer.name === "Official Trailer" || "Trailer",
  );

  console.log("find:", findOfficialTrailer);

  const getTrailerKeyFromOfficialTrailer = findOfficialTrailer?.key;
  console.log(getTrailerKeyFromOfficialTrailer);

  const trailerKey = getTrailerKeyFromOfficialTrailer;

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col gap-4 w-full max-w-5xl">
        <div className="flex items-center justify-between w-full px-5 pt-8">
          <div>
            <h1>{data.title}</h1>
            <p>
              {`${data.release_date}`} • {data.adult ? "R" : "PG"} •{" "}
              {`${time.hours}h` + " " + `${time.minutes}m`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Star fill="yellow" stroke="none" />
            <div className="flex flex-col">
              <p>
                {`${data.vote_average.toFixed()}`}
                <span className="text-muted-foreground">/10</span>
              </p>
              <p>{data.vote_count}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex md:flex-row-reverse md:justify-center w-full">
          <div className="w-full h-71 md:h-107 md:w-4/5 relative">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="hidden md:block w-20 h-37 md:w-1/5 md:h-107 relative">
            <Image
              src={`${imageUrl}${data.poster_path}`}
              alt={data.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex gap-4 w-full px-5">
          <div className="block md:hidden w-32 h-48 shrink-0 relative">
            <Image
              src={`${imageUrl}${data.poster_path}`}
              alt={data.title}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex gap-2 flex-wrap">
              {data.genres.map((genre) => {
                return <Badge key={genre.id}>{genre.name}</Badge>;
              })}
            </div>
            <p className="mt-2">{data.overview}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-5">
          <p className="flex gap-8">
            <span className="font-bold">Director</span> {director?.name}
          </p>
          <Separator />
          <p className="flex gap-8">
            <span className="font-bold">Writers</span>

            {writers.map((w) => w.name).join(" • ")}
          </p>
          <Separator />
          <p className="flex gap-8">
            <span className="font-bold">Stars</span>

            {stars.map((s) => s.name).join(" • ")}
          </p>
          <Separator />
        </div>

        <MoreLikeThis movieId={movieId} />
      </div>
    </div>
  );
}
