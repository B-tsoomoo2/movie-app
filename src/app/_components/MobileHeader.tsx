"use client";
import { useState } from "react";
import Link from "next/link";

import { Film, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

import { Genre } from "./Genre";
import { SearchInput } from "./Search";
export const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      {!isOpen ? (
        <div className="flex justify-between px-5 items-center py-3">
          <Link href="/" className="flex gap-2 items-center">
            <Film className="text-[#4338CA]" />
            <p className="italic text-[#4338CA] font-bold">Movie Z</p>
          </Link>

          <div className=" flex gap-3">
            <Button variant={"outline"} onClick={() => setIsOpen(true)}>
              <Search />
            </Button>
            <ModeToggle />
          </div>
        </div>
      ) : (
        <div className="flex justify-center gap-6 px-2 py-3 ">
          <Genre />
          <div className="min-w-0 flex-1">
            <SearchInput />
          </div>
          <Button
            size="icon"
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            <X />
          </Button>
        </div>
      )}
    </div>
  );
};
