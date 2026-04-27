import { Button } from "@/components/ui/button";
import { Film, Search } from "lucide-react";
import Link from "next/link";
import { Genre } from "./Genre";
import { ModeToggle } from "./ModeToggle";
import { SearchInput } from "./Search";
export const Header = () => {
  return (
    <div className="flex justify-between px-5 items-center py-3">
      <Link href="/" className="flex gap-2 items-center">
        <Film className="text-[#4338CA]" />
        <p className="italic text-[#4338CA] font-bold">Tsoomoo Z</p>
      </Link>

      <div className="flex gap-4 items-center">
        <Genre />
        <div className="relative">
          {/* <Input className=" w-94.75 pl-8 " placeholder="Search.." />
          <Search
            className="absolute top-2.5 left-2.5"
            size={16}
            color="gray "
          /> */}
          <SearchInput />
        </div>
      </div>
      <div className="md:hidden flex gap-3">
        <Button variant="outline">
          <Search />
        </Button>
      </div>

      <ModeToggle />
    </div>
  );
};
