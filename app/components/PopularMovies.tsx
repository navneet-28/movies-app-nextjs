import React from "react";
import Link from "next/link";
import Card, { Movie } from "./Card";

const PopularMovies = ({ popularMovies }: { popularMovies: any }) => {
  return (
    // <div className="flex flex-col mb-6">
    //   <div className="flex justify-between items-center mt-4">
    //     <h1 className="text-2xl font-medium">Popular Movies</h1>
    //     <Link
    //       href="/movies/popular"
    //       className="py-2 px-5 bg-slate-800 text-md font-normal text-white"
    //     >
    //       See all
    //     </Link>
    //   </div>
    //   <div className="grid grid-cols-4 mt-4 gap-4">
    //     {popularMovies.results.map((movie: Movie) => (
    //       <Card key={movie?.id} movie={movie} />
    //     ))}
    //   </div>
    // </div>
    <div>{popularMovies}</div>
  );
};

export default PopularMovies;
