"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Card from "../Card";
import Paginate from "../Paginate";
import InfiniteScroll from "react-infinite-scroll-component";
// import {Spinner}

export default function PopularMovies() {
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/popular?page=${page}`);
      const data = await response.json();
      if (popular.length === 0) {
        setPopular(data.results);
      } else {
        setPopular([...popular, ...data.results]);
      }
      // setPopular([...popular, ...data.results]);

      if (data.length === 0) {
        setHasMore(false);
      }
      setPage(page + 1);
    } catch (error) {
      console.error("Error Fetching data: ", error);
    }
  };

  useEffect(() => {
    // make the size of popular to 0 to avoid an empty card initially
    setPopular([]);
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-white text-center">Popular Movies</h1>
      {popular && (
        <InfiniteScroll
          dataLength={popular.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <ul
            // className="grid grid-cols-4 mx-auto max-w-[1260px] gap-10"
            className="align-items:center justify-content:center text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto my-auto max-w-[1260px] gap-10"
          >
            {popular.map((movie) => (
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
                />
              </li>
            ))}
          </ul>
        </InfiniteScroll>
      )}
      {/* <Paginate
        query={""}
        currentPage={page < 1 || page > popular.total_pages ? 1 : page}
        totalPages={popular.total_pages}
        qtype={"popular"}
        onPageChange={(data, increment) => {
          setPopular(data);
          setPage(page + increment);
        }}
      /> */}
    </div>
  );
}
