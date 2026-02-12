// import { Button } from "@/components/ui/button";
// import { ArrowRight } from "lucide-react";
// import Link from "next/link";

// export const Upcoming = () => {
//   return (
//     <div className="flex justify-between ">
//       <h3 className="font-semibold text-2xl">Upcoming</h3>
//       <div className="flex items-center flex-col border border-amber-200 ">
//         <Link href="/upcoming">
//           <p>See more</p>
//           <ArrowRight />

//         </Link>
//       </div>
//     </div>
//   );
// };
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Upcoming = () => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="font-semibold text-2xl">Upcoming</h3>

      <Link href="/upcoming" className="flex items-center gap-2  px-3 py-2">
        <span>See more</span>
        <ArrowRight size={18} />
      </Link>
    </div>
  );
};
