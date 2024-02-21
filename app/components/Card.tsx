"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { CardProps } from "../types/movie.type";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";

export default function Card({
  title,
  movieId,
  poster_path,
  release_date,
  backdrop_path,
  id,
  movieRating,
  vote_average,
}: CardProps) {
  const imagePath = "https://image.tmdb.org/t/p/original";
  return (
    <Link href={`/movie/${id}`}>
      <div className="w-fit mt-[20px]">
        <div className="w-[250px]">
          <Image
            src={imagePath + poster_path}
            alt={title || "movie"}
            className="h-[350px] w-[250px] max-sm:w-[350px] bg-stone-300 transition ease-in-out cursor-pointer hover:brightness-50 hover:scale-110 rounded-s-2xl"
            loading="lazy"
            width={500}
            height={500}
            blurDataURL={imagePath + backdrop_path}
            placeholder="blur"
          />
          <section className="flex items-center justify-between">
            <div className="block">
              <h1 className="mt-3 text-sm text-white font-semibold tracking-tight">
                {title}
              </h1>
              <p className="text-sm flex gap-3 text-slate-400 font-normal mt-1">
                <span>
                  <StarIcon
                    style={{ fontSize: "16px" }}
                    className="text-orange-600"
                  />
                  {movieRating?.toFixed(1)}
                </span>
                <span>|</span>
                <span> {release_date?.substring(0, 4)}</span>
              </p>
            </div>
          </section>
        </div>
      </div>
    </Link>
  );
}
