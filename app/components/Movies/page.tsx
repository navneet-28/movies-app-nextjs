"use client";

import Link from "next/link";
import {
  useState,
  useEffect,
  Suspense,
  SetStateAction,
  ChangeEvent,
} from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import SearchMovie from "../SearchMovie";
import PopularMovies from "../PopularMovies/PopularMovies";
import Card from "../Card";
import Paginate from "../Paginate";

interface IMovie {
  title: string;
  poster_path: string;
  release_date: string;
  backdrop_path: string;
  id: number;
  movieRating?: number;
  vote_average?: number;
  runtime?: number;
}
export default function Movies() {
  const [query, setQuery] = useState("");
  const [isPopular, setIsPopular] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [movies, setMovies] = useState<IMovie[]>([]);

  const router = useRouter();

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch(`/api/search?query=${query}&page=${page}`);
      const searchMovies = await response.json();
      setMovies(searchMovies.results);
      setTotalPages(searchMovies.total_pages);
    };
    getMovies();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    setIsPopular(false);
    e.preventDefault();

    const response = await fetch(`/api/search?query=${query}&page=${page}`);
    const movie = await response.json();
    setMovies(movie.results);
    setTotalPages(movie.total_pages);
  };
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newQuery = e.target.value;
    setQuery(newQuery);
    setIsPopular(false);

    if (newQuery.trim() === "") {
      setIsPopular(true);
      setMovies([]);
      setTotalPages(1);
    } else {
      const response = await fetch(
        `/api/search?query=${newQuery}&page=${page}`
      );
      const movie = await response.json();
      setMovies(movie.results);
      setTotalPages(movie.total_pages);
    }
  };
  const handleHomepageClick = () => {
    setIsPopular(true);
    setQuery("");
    // router.refresh();
  };
  return (
    <>
      <div className="text-center my-2">
        <form onSubmit={handleSubmit}>
          <input
            className="text-black border-2 border-black rounded-full px-3 py-2"
            type="text"
            placeholder="Search movie..."
            value={query}
            onChange={(e) => handleChange(e)}
          />
          <button
            color="white"
            type="submit"
            className="rounded-full px-3 py2 hover:bg-black/60"
          >
            <FaSearch className="text-white" />
          </button>
        </form>
      </div>

      <div>
        {isPopular ? (
          <div>
            <PopularMovies />
          </div>
        ) : (
          <div>
            {isPopular ? (
              <h1 className="text-white text-center">Popular Movies</h1>
            ) : (
              <h1 className="text-white text-center">Search Results</h1>
            )}
            <div className="text-center my-2">
              <button
                onClick={handleHomepageClick}
                className="bg-cyan-900 mx-1 my-2 text-white font-bold py-2 px-4 rounded-full"
              >
                Back to Homepage
              </button>
            </div>
            <div>
              {movies.length >= 1 ? (
                <Suspense
                  fallback={
                    <div className="text-center mx-2 my-2">
                      <div className="bg-yellow-900 text-white font-bold py-2 px-4 rounded-full">
                        Nothing to show
                      </div>
                    </div>
                  }
                >
                  <ul
                    // className="grid grid-cols-4 mx-auto max-w-[1260px] gap-10"
                    className="align-items:center justify-content:center text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto my-auto max-w-[1260px] gap-10"
                  >
                    {movies.map((movie) => (
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
                          movieId={0}
                        />
                      </li>
                    ))}
                  </ul>
                  <Paginate
                    query={query}
                    currentPage={page < 1 || page > totalPages ? 1 : page}
                    totalPages={totalPages}
                    qtype={"search"}
                    onPageChange={(data, increment) => {
                      setMovies(data as unknown as SetStateAction<IMovie[]>);
                      setPage(page + increment);
                    }}
                  />
                </Suspense>
              ) : (
                <div className="text-center flex justify-center gap-4 mt-6 mb-6">
                  <div className="bg-yellow-900 text-white font-bold py-2 px-4 rounded-full">
                    Nothing to show
                  </div>
                </div>
              )}
            </div>
            )
          </div>
        )}
      </div>
    </>
  );
}
