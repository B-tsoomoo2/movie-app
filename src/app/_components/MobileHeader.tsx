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
        <div className="flex justify-center gap-6 px-2 py-3 ">
          <Genre />
          <div className="relative flex gap-2">
            <Search className="absolute translate-2 size-5 text-muted-foreground/60" />
            <Input
              placeholder="Search..."
              className="pl-10"
              // value={value}
              // onChange={handleChange}
            />
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
