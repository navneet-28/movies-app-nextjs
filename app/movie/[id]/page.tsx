"use client";

import Card from "../../components/Card";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import { CircularProgress } from "@mui/material";

const apiKey = process.env.API_KEY;

export interface IParamsMovieDetails {
  params: {
    id: string;
  };
}

export interface IMovieDetails {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  runtime: number;
}
async function getMovieDetails(id: string) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: apiKey || "",
    },
  };
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}`,
    options
  );
  const data = await response.json();
  //   return data;
  return {
    id: data.id,
    title: data.title,
    backdrop_path: data.backdrop_path,
    poster_path: data.poster_path,
    release_date: data.release_date,
    vote_average: data.vote_average,
    overview: data.overview,
    runtime: data.runtime,
  };
  // console.log(data);
}

export default function MovieDetails({ params }: IParamsMovieDetails) {
  const [movieDetails, setMovieDetails] = useState<IMovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
    getMovieDetails(params.id)
      .then((data) => {
        setMovieDetails(data);
        setLoading(false);
        setImgLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(true);
      });
    // console.log(movieDetails);
  }, [params.id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching movie details</p>;
  }

  if (!movieDetails) {
    return <p>No movie details available</p>;
  }

  const {
    backdrop_path,
    title,
    release_date,
    vote_average,
    overview,
    runtime,
  } = movieDetails;
  const imagePath = "https://image.tmdb.org/t/p/original";
  function onImageLoad() {
    setImgLoading(false);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-[500px] relative">
        {/* <Suspense
          fallback={
            <p>
              <div className="bg-cyan-900 text-white font-bold py-2 px-4 rounded-full">
                Loading Image
              </div>
            </p>
          }
        > */}
        {imgLoading ? (
          <CircularProgress className="text-center" />
        ) : (
          <Image
            src={imagePath + backdrop_path}
            alt={title}
            className="w-full h-full object-cover rounded-md"
            layout="fill"
            placeholder="blur"
            blurDataURL={imagePath + backdrop_path}
            onLoad={onImageLoad}
            priority
          />
        )}
        {/* </Suspense> */}
      </div>
      <div className="flex flex-col items-center mt-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-gray-100 mt-2">{title}</p>
        <p className="text-sm text-gray-100 mt-2">
          Release Date: {dayjs(release_date).format("MMMM D, YYYY")}
        </p>
        <p className="text-sm text-gray-100 mt-2">Runtime: {runtime} minutes</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-2xl font-bold">{vote_average}</span>
          <span className="text-2xl font-bold">★</span>
        </div>
        <p className="text-sm text-gray-100 mt-2">{overview}</p>
      </div>
    </div>
  );
}
