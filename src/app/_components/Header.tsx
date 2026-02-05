import { Button } from "@/components/ui/button";
import { Film, Moon, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Genre } from "./Genre";
import { ModeToggle } from "./ModeToggle";
export const Header = () => {
  return (
    <div className="flex justify-between px-5 items-center py-3">
      <div className="flex gap-2">
        <Film className="text-[#4338CA]" />
        <p className="italic text-[#4338CA] font-bold">Movie Z</p>
      </div>

      <div className="flex gap-4 items-center">
        <Genre />
        <div className="relative">
          <Input className=" w-94.75 pl-8 " placeholder="Search.." />
          <Search
            className="absolute top-2.5 left-2.5"
            size={16}
            color="gray "
          />
        </div>
      </div>

      <div className=" flex gap-3">
        <Button variant={"outline"}>
          <Search />
        </Button>

        <ModeToggle />
      </div>
    </div>
  );
};
