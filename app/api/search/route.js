import { NextResponse } from "next/server";

const apiKey = process.env.API_KEY;

async function searchMovie(query, page) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: apiKey,
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
    options
  );
  const movie = await response.json();
  return movie;
}
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  console.log(request.url);
  const query = searchParams.get("query");
  const page = searchParams.get("page");

  const movies = await searchMovie(query, page);

  const res = {
    results: movies.results,
    total_pages: movies.total_pages,
  };
  return NextResponse.json(movies);
}
