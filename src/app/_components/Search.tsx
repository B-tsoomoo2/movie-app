"use client";
import { Movie } from "@/lib/types";
import { ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { searchMovie } from "@/lib/search";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const SearchInput = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const onChangeSearchValue: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value === "") {
      setMovies([]);
      setOpen(false);
    }
  };

  useEffect(() => {
    if (searchValue === "") {
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

  const trimmedSearchValue = searchValue.trim();
  const searchResultsHref = trimmedSearchValue
    ? `/searchedpage?q=${encodeURIComponent(trimmedSearchValue)}`
    : "/searchedpage";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!trimmedSearchValue) {
      return;
    }

    closeDropdown();
    router.push(searchResultsHref);
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <InputGroupInput
            value={searchValue}
            onChange={onChangeSearchValue}
            placeholder="Search..."
          />

          <InputGroupAddon align="inline-end">
            <InputGroupButton
              type="submit"
              size="icon-sm"
              variant="ghost"
              aria-label="Search"
            >
              <Search size={18} />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>

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
              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                  width={48}
                  height={64}
                  className="h-16 w-12 rounded-md object-cover"
                />
              ) : (
                <div className="flex h-16 w-12 items-center justify-center rounded-md bg-zinc-800 text-[10px] text-zinc-400">
                  N/A
                </div>
              )}

              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">
                  {movie.title}
                </span>
                <span className="text-xs text-zinc-400">
                  ⭐ {movie.vote_average} • {movie.release_date?.slice(0, 4)}
                </span>
                <Link href={`/movie/${movie.id}`} onClick={closeDropdown}>
                  See more
                </Link>
              </div>
            </div>
          ))}
          {trimmedSearchValue ? (
            <div className="border-t border-zinc-800 p-3">
              <Link
                href={searchResultsHref}
                onClick={closeDropdown}
                className="block text-sm text-white transition hover:text-zinc-300"
              >
                See all results for &quot;{trimmedSearchValue}&quot;
              </Link>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
