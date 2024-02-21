import React from "react";
import PopularMovies from "../PopularMovies/PopularMovies";
import SearchMovie from "../SearchMovie";

export default async function Homepage() {
  return (
    <>
      <SearchMovie />
      <div>
        <p className="text-white text-center">Homepage</p>
      </div>
      <div>
        <PopularMovies />
      </div>
    </>
  );
}
