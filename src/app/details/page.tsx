import { Badge } from "@/components/ui/badge";

import { Star } from "lucide-react";
import getBaseWebpackConfig from "next/dist/build/webpack-config";
import Image from "next/image";
const badgeMockData = ["Fairy", "Pop Musical", "fantasy", "Musical", "Romance"];
//   Fairy tale Pop Musical Fantasy Musical Romance

export default function Detail() {
  const movie = {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s",
    postrtImage:
      "https://www.arrowvideo.com/images?url=https://static.thcdn.com/productimg/original/13422363-1245163344118087.jpg&format=webp&auto=avif&width=1000&height=1000&fit=cover%22%22",
  };

  return (
    <div>
      <div className="flex justify-between items-center px-6 ">
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-2xl">D U N E</h1>
          <p>2024 • PG •2h 40m </p>
        </div>
        <div className="flex items-center ">
          <Star fill="#FFEE58" className="text-yellow-300 " />
          <div className="flex flex-col">
            <p>6.9/10 </p>
            <p>37k</p>
          </div>
        </div>
      </div>

      <div
        className=""
        style={{
          height: 284,
          backgroundImage: `url(${movie.image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          marginTop: "20px",
        }}
      />

      <div className="flex gap-3">
        <div
          style={{
            height: 148,
            backgroundImage: `url(${movie.postrtImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            minWidth: 100,
          }}
        />

        <div>
          <div className="flex items-start gap-2 flex-wrap">
            {badgeMockData.map((badge) => (
              <Badge className="" key={badge} variant={"default"}>
                {badge}
              </Badge>
            ))}
          </div>

          <h1 className="mt-15">
            Elphaba, a misunderstood young woman because of her green skin, and
            Glinda, a popular girl, become friends at Shiz University in the
            Land of Oz. After an encounter with the Wonderful Wizard of Oz,
            their friendship reaches a crossroads.
          </h1>
        </div>
      </div>
    </div>
  );
}
