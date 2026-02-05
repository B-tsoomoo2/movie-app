import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, ChevronDown, ChevronRight } from "lucide-react";

export const Genre = () => {
  const genres = [
    {
      id: 1,
      name: "Adventure",
    },
    {
      id: 2,
      name: "Comedy",
    },
    {
      id: 3,
      name: "Horror",
    },
    {
      id: 5,
      name: "Biography",
    },
    {
      id: 6,
      name: "Comedy",
    },
    {
      id: 7,
      name: "Crime",
    },
    {
      id: 8,
      name: "Documentary",
    },
    {
      id: 9,
      name: "Drama",
    },
    {
      id: 10,
      name: "Family",
    },
    {
      id: 11,
      name: "Fantasy",
    },
    {
      id: 12,
      name: "Film-Noir",
    },
    {
      id: 13,
      name: "Game-Show",
    },
    {
      id: 14,
      name: "History",
    },
    {
      id: 15,
      name: "Music",
    },
    {
      id: 16,
      name: "Musical",
    },
    {
      id: 17,
      name: "Mystery",
    },
    {
      id: 18,
      name: "News",
    },
    {
      id: 19,
      name: "Reality-TV",
    },
    {
      id: 20,
      name: "Romance",
    },
    {
      id: 21,
      name: "Sci-Fi",
    },
    {
      id: 22,
      name: "Short",
    },
    {
      id: 23,
      name: "Sport",
    },
    {
      id: 24,
      name: "Talk-Show",
    },
    {
      id: 25,
      name: "Thriller",
    },
    {
      id: 26,
      name: "War",
    },
    {
      id: 27,
      name: "Western",
    },
  ];
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <ChevronDown />
            <h3 className="md:block hidden">Genre</h3>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-2xl ">Genres</DropdownMenuLabel>
            <DropdownMenuLabel>See list of movies by genre</DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="grid grid-cols-2 md:grid-cols-5">
              {genres.map((genre) => (
                <Badge key={genre.id} variant="outline">
                  <p>{genre.name}</p>
                  <ChevronRight />
                </Badge>
              ))}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
