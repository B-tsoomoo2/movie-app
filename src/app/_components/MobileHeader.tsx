"use client";
import { useState } from "react";

import { Film, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

import { Genre } from "./Genre";
import { Input } from "@/components/ui/input";
export const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      {!isOpen ? (
        <div className="flex justify-between px-5 items-center py-3">
          <div className="flex gap-2">
            <Film className="text-[#4338CA]" />
            <p className="italic text-[#4338CA] font-bold">Movie Z</p>
          </div>

          <div className=" flex gap-3">
            <Button variant={"outline"} onClick={() => setIsOpen(true)}>
              <Search />
            </Button>
            <ModeToggle />
          </div>
        </div>
      ) : (
        <div className="flex justify-between px-2 py-3">
          <div className="flex gap-4 items-center">
            <Genre />
            <div className="relative">
              <Input className=" w-80 pl-8 " placeholder="Search.." />
              <Search
                className="absolute top-2.5 left-2.5"
                size={16}
                color="gray "
              />
              <X
                className="absolute right-2 top-2.5"
                color="gray"
                size={16}
                onClick={() => setIsOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
