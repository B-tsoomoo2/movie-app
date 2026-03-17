"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

import { GenrePillList } from "./GenrePillList";

export const Genre = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-12 gap-2 rounded-xl border-border/70 px-4"
          >
            <ChevronDown />
            <h3 className="md:block hidden">Genre</h3>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          sideOffset={10}
          className="w-[min(88vw,680px)] rounded-[28px] border border-white/10 bg-[#0b0b0f] p-5 text-white"
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel className="px-0 text-[32px] leading-none font-semibold tracking-tight">
              Genres
            </DropdownMenuLabel>
            <DropdownMenuLabel className="px-0 pt-2 text-sm font-normal text-white/72">
              See list of movies by genre
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="mx-0 my-4 bg-white/10" />
          <DropdownMenuGroup>
            <GenrePillList
              containerClassName="grid grid-cols-2 gap-3 md:grid-cols-3"
              pillClassName="h-9 px-3 text-sm"
            />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
