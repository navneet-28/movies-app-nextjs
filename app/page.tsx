import Image from "next/image";
import Homepage from "./components/Homepage/page";
import { Interface } from "readline";
import Link from "next/link";

import PopularMovies from "./components/PopularMovies";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from "react";

const API_KEY = process.env.TMDB_API_KEY;

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}
async function fetchPopularMovies() {
  // const response = await fetch(
  //   "https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1"
  // );
  // return response.json();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer 8400e8ce36a909c47ee4b6f24dd3642b",
    },
  };

  const res = await fetch(
    "https://api.themoviedb.org/3/search/movie?language=en-US&page=1",
    options
  );
  // .then((response) => response.json())
  // .then((response) => console.log(response))
  // .catch((err) => console.error(err));

  return res.json();
}
async function getUpcomingMovies() {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1"
  );
  return response.json();
}
async function getTopRatedMovies() {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1"
  );
  return response.json();
}

export default async function Home() {
  const popularMovies = await fetchPopularMovies();
  const upcomingMovies = await getUpcomingMovies();
  const topRatedMovies = await getTopRatedMovies();

  return (
    <main>
      <Homepage />
      <PopularMovies popularMovies={popularMovies} />
    </main>
  );
}
