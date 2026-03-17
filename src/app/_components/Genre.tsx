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
          className="w-[min(92vw,820px)] rounded-3xl border border-white/10 bg-[#0b0b0f] p-7 text-white shadow-2xl"
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel className="px-0 text-[40px] leading-none font-semibold tracking-tight">
              Genres
            </DropdownMenuLabel>
            <DropdownMenuLabel className="px-0 pt-3 text-base font-normal text-white/72">
              See list of movies by genre
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="mx-0 my-6 bg-white/10" />
          <DropdownMenuGroup>
            <GenrePillList />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
