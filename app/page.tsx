"use client";
import Image from "next/image";
import Homepage from "./components/Homepage/page";
import { Interface } from "readline";
import Link from "next/link";
import { useState } from "react";

import PopularMovies from "./components/PopularMovies/page";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from "react";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
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

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  async function fetchPopularMovies() {
    // const response = await fetch(
    //   "https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1"
    // );
    // return response.json();
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDAwZThjZTM2YTkwOWM0N2VlNGI2ZjI0ZGQzNjQyYiIsInN1YiI6IjY1NzQ4NGNkYmJlMWRkMDBhYzdjMzc5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DEYU8M5LnsndFnDbNTR6zxE7fJw_f8tGKxR-EYH2KaA",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => setPopularMovies(response.results))
      .then((response) => setLoaded(true))
      .catch((err) => setError(err));
  }
  // const popularMovies = await fetchPopularMovies();
  // const upcomingMovies = await getUpcomingMovies();
  // const topRatedMovies = await getTopRatedMovies();
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  fetchPopularMovies().then((movies) => {
    console.log(movies);
  });

  if (error) {
    return <div>Error: {error}</div>;
  } else if (!loaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <main>
        <Homepage />
        {/* <PopularMovies popularMovies={popularMovies} /> */}
        <div className="col">
          {popularMovies.map((movie) => (
            <div key={movie.id}>{movie.title}</div>
          ))}
        </div>
      </main>
    );
  }
}
