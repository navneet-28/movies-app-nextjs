"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Card from "../Card";
import Paginate from "../Paginate";

export default function PopularMovies() {
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getPopular = async () => {
      const response = await fetch(`/api/popular?page=${page}`);
      const data = await response.json();
      setPopular(data);
    };

    getPopular();
  }, []);

  return (
    <div>
      <h1 className="text-white text-center">Popular Movies</h1>
      <ul
        // className="grid grid-cols-4 mx-auto max-w-[1260px] gap-10"
        className="align-items:center justify-content:center text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto my-auto max-w-[1260px] gap-10"
      >
        {popular.results &&
          popular.results.map((movie) => (
            <li
              key={movie?.id}
              className="flex flex-col items-center justify-center"
            >
              <Card
                title={movie?.title}
                id={movie?.id}
                poster_path={movie?.poster_path}
                backdrop_path={movie?.backdrop_path}
                release_date={movie?.release_date}
                movieRating={movie?.vote_average}
                runtime={movie?.runtime}
              />
            </li>
          ))}
      </ul>
      <Paginate
        query={""}
        currentPage={page < 1 || page > popular.total_pages ? 1 : page}
        totalPages={popular.total_pages}
        qtype={"popular"}
        onPageChange={(data, increment) => {
          setPopular(data);
          setPage(page + increment);
        }}
      />
    </div>
  );
}
