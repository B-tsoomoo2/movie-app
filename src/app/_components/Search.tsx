"use client";
import { Movie } from "@/lib/types";
import { ChangeEventHandler, useEffect, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { searchMovie } from "@/lib/search";
import Link from "next/link";

export const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const onChangeSearchValue: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (searchValue === "") {
      setMovies([]);
      setOpen(false);
      return;
    }

    const timeout = setTimeout(() => {
      const getMovies = async () => {
        setLoading(true);
        setOpen(true);
        const data = await searchMovie(searchValue);
        setMovies(data.results || []);
        setLoading(false);
      };
      getMovies();
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  const closeDropdown = () => {
    setOpen(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <InputGroup>
        <InputGroupInput
          value={searchValue}
          onChange={onChangeSearchValue}
          placeholder="Search..."
        />
        <InputGroupAddon>
          <Search size={18} />
        </InputGroupAddon>
      </InputGroup>

      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-xl bg-zinc-900 shadow-lg max-h-96 overflow-y-auto border border-zinc-800">
          {loading && (
            <div className="p-4 text-sm text-zinc-400">Loading...</div>
          )}

          {!loading && movies.length === 0 && (
            <div className="p-4 text-sm text-zinc-400">No results found</div>
          )}

          {movies.slice(0, 3).map((movie) => (
            <div
              key={movie.id}
              className="flex items-center gap-3 p-3 hover:bg-zinc-800 cursor-pointer transition"
            >
              <img
                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                alt={movie.title}
                className="w-12 h-16 object-cover rounded-md"
              />

              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">
                  {movie.title}
                </span>
                <span className="text-xs text-zinc-400">
                  ⭐ {movie.vote_average} • {movie.release_date?.slice(0, 4)}
                </span>
              </div>
            </div>
          ))}
          <div>
            <Link href="/searchedpage" onClick={closeDropdown}>
              <div>See all results for</div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
