"use server";

// import { NextApiRequest, NextApiResponse } from "next";

export async function fetchMovies(
  query: string,
  page: number,
  qtype: string
): Promise<any> {
  if (qtype == "popular") {
    const response = await fetch(`/api/popular?page=${page}`);
    const data = await response.json();
    return data;
  }
  if (qtype == "search") {
    const response = await fetch(`/api/search?query=${query}&page=${page}`);
    const data = await response.json();
    return data.results;
  }
}
