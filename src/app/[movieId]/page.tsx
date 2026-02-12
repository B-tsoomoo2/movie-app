import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getMovieById } from "@/lib/api";
import { Star } from "lucide-react";
import getBaseWebpackConfig from "next/dist/build/webpack-config";
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
  console.log({ data });
  const imageUrl = "https://image.tmdb.org/t/p/w500";

  const crewData = await getCrew(movieId);
  console.log("crewdata", crewData);

  const director = crewData.crew.find((person) => person.job === "Director");

  const writers = crewData.crew.filter(
    (person) =>
      person.job === "Writer" ||
      person.job === "Screenplay" ||
      person.job === "Story",
  );

  const stars = crewData.cast.slice(0, 3);

  function convertMinutesToHoursAndMinutes(totalMinutes: number): {
    hours: number;
    minutes: number;
  } {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return { hours, minutes };
  }

  const time = convertMinutesToHoursAndMinutes(data.runtime);

  return (
    <div>
      <div className="flex justify-between items-center px-6 ">
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-2xl">{data.title}</h1>
          <p>{`${time.hours}h ${time.minutes}min`}</p>
        </div>
        <div className="flex items-center ">
          <Star fill="#FFEE58" className="text-yellow-300 " />
          <div className="flex flex-col">
            <p>{data.vote_average.toFixed(1)}/10</p>
            <p>{data.vote_count}</p>
          </div>
        </div>
      </div>

      <div
        className=""
        style={{
          height: 284,
          backgroundImage: `url(${imageUrl}${data.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          marginTop: "20px",
        }}
      />

      <div className="flex gap-3">
        <div
          style={{
            height: 148,
            backgroundImage: `url(${imageUrl}${data.poster_path})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            minWidth: 100,
          }}
        />

        <div>
          <div className="flex  items-start gap-2 flex-wrap">
            {data.genres.map((genre) => (
              <Badge key={genre.id} variant={"default"}>
                {genre.name}
              </Badge>
            ))}
          </div>

          <h1>{data.overview}</h1>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex gap-14 ">
          <h1>Director</h1>
          <p>{director?.name}</p>
        </div>
        <Separator className="mt-2 mb-6" />

        <div className="flex gap-14">
          <h1>Writers</h1>
          <p>{writers.map((w) => w.name).join(" • ")}</p>
        </div>
        <Separator className="mt-2 mb-6" />

        <div className="flex gap-14">
          <h1>Stars</h1>
          <p>{stars.map((s) => s.name).join(" • ")}</p>
        </div>
        <Separator className="mt-2 mb-6" />
      </div>
      <MoreLikeThis movieId={movieId} />
    </div>
  );
}
