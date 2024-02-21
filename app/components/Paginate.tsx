"use client";

import Link from "next/link";
import { useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";

interface IPaginate {
  query: string;
  currentPage: number;
  totalPages: number;
  qtype: string;
  onPageChange: (page: number, increment: number) => void;
}
const setMovies = async (
  query: string,
  page: number,
  increment: number,
  qtype: string,
  onPageChange: (data: any, increment: number) => void
) => {
  //   console.log(page);
  if (qtype == "popular") {
    const response = await fetch(`api/popular?page=${page}`);
    const data = await response.json();
    onPageChange(data, increment);
  }
  if (qtype == "search") {
    const response = await fetch(`api/search?query=${query}&page=${page}`);
    const data = await response.json();
    onPageChange(data.results, increment);
  }
};
const Paginate = ({
  query,
  currentPage,
  totalPages,
  qtype,
  onPageChange,
}: IPaginate) => {
  return (
    <>
      <div className="flex justify-center gap-4 mt-6 mb-6">
        (
        {currentPage > 1 && (
          <button
            onClick={() =>
              setMovies(
                qtype == "popular" ? "" : query,
                Number(currentPage) - 1,
                -1,
                qtype == "popular" ? "popular" : "search",
                onPageChange
              )
            }
            className="bg-cyan-900 text-white font-bold py-2 px-4 rounded-r-full"
          >
            Prev
          </button>
        )}
        {
          <div className="bg-cyan-900 text-white font-bold py-2 px-4 rounded-full">
            {currentPage} of {totalPages}
          </div>
        }
        {currentPage < totalPages && (
          <button
            onClick={() =>
              setMovies(
                qtype == "popular" ? "" : query,
                Number(currentPage) + 1,
                1,
                qtype == "popular" ? "popular" : "search",
                onPageChange
              )
            }
            className="bg-cyan-900 text-white font-bold py-2 px-4 rounded-l-full"
          >
            Next
          </button>
        )}
        )
      </div>
    </>
  );
};

export default Paginate;
