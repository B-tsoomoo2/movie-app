import { CarouselDesktop } from "./_components/CarouselDesktop";
import { CarouselMobile } from "./_components/CarouselMobile";
import { Header } from "./_components/Header";
import { MobileHeader } from "./_components/MobileHeader";
import { MovieCard } from "./_components/MovieCard";
import { Upcoming } from "./_components/Upcoming";

const Home = () => {
  return (
    <div>
      <div className="hidden md:block">
        <Header />
      </div>
      <div className="md:hidden">
        <MobileHeader />
      </div>
      <div className="flex justify-center">
        <CarouselMobile />
        <CarouselDesktop />
      </div>

      {/* <MovieCarousel /> */}
      <div className="px-5 py-3">
        <Upcoming />
      </div>
      <div className="p-4 grid grid-cols-2 md:grid-cols-5 gap-2">
        {Array.from({ length: 10 }).map((_, i) => {
          return (
            <div key={i} className="">
              <MovieCard />
            </div>
          );
        })}
      </div>
    </div>
  );
};

type MovieCardProps = {
  img: string;
  rating: number;
  name: string;
};

// export const MovieCard = (props: MovieCardProps) => {
//   const { img, rating, name } = props;
//   return (
//     <div className="  border w-fit bg-gray-300 ">
//       <img src={img} alt="poster" className="w-[160px] md:w-[200px]" />
//       <div className="flex gap-2 mt-2 ">
//         <Star className="text-yellow-300" />
//         <div className="flex w-16 h-8">
//           <p>{rating}</p>
//           <p>/10</p>
//         </div>
//       </div>
//       <h1 className="text-2xl">{name}</h1>
//     </div>
//   );
// };

export default Home;
