"use client";

import { Movie } from "@/lib/types";
import { ChangeEventHandler, useEffect, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";

export const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

  const onChangeSearchValue: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchValue(event.target.value);
  };
  useEffect(() => {
    if (searchValue === "") {
      setMovies([]);
      return;
    }
  });
  return (
    <div className="grid grid-cols-2">
      <InputGroup className="max-w-xs">
        <InputGroupInput
          value={searchValue}
          onChange={onChangeSearchValue}
          placeholder="Search. . ."
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>
    </div>
  );
};
