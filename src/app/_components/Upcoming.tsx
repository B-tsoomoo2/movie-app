import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Upcoming = () => {
  return (
    <div className="flex justify-between">
      <h3 className="font-semibold text-2xl">Upcoming</h3>
      <div className="flex items-center ">
        
        <p>See more</p>
        <ArrowRight />
        
      </div>
    </div>
  );
};
