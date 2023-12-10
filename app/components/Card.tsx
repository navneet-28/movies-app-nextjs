import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}
const IMAGE_URL = "https://image.tmdb.org/t/p/original";

const Card = ({ movie }: { movie: Movie }) => {
  return (
    <Link href={`/movie/${movie?.id}`} className="w-full flex flex-col">
      <div className="w-full h-[400px] relative">
        <Image
          src={`${IMAGE_URL}${movie?.poster_path}`}
          alt={movie?.title}
          fill={true}
        />
      </div>
      <div className="flex gap-4 justify-between items-center mt-3 bg-red">
        <h2 className="text-lg font-medium">{movie?.title}</h2>
        <span
          className={`flex flex-col p-2 text-white rounded-md ${
            movie?.vote_average < 5
              ? `bg-red-700`
              : movie?.vote_average == 5
              ? `bg-orange-600`
              : `bg-green-700`
          }`}
        >
          {movie?.vote_average}
        </span>
      </div>
    </Link>
  );
};

export default Card;
