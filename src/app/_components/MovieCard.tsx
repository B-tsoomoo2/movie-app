import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";

export const MovieCard = () => {
  return (
    <Card className="bg-muted p-0">
      <CardContent className="p-0">
        <img
          className="w-full h-full rounded-t-xl"
          alt="poster"
          src="https://m.media-amazon.com/images/I/91qsUt4hZtL._AC_UF894,1000_QL80_.jpg"
        />
      </CardContent>
      <CardFooter className="flex flex-col gap-1 pb-2 items-start">
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <Star fill="#FFEE58" className="text-yellow-400" />
            <p>6.9/10</p>
          </div>
          <h1>Dear Santa</h1>
        </div>
      </CardFooter>
    </Card>
  );
};
