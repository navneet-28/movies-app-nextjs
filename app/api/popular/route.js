// import Card, { Movie } from "../Card";
import { NextResponse } from "next/server";

const apiKey = process.env.API_KEY;

async function searchPopular(page) {
  console.log("hello");
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: apiKey,
    },
  };

  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
    options
  );
  const popular = await data.json();
  // console.log(popular);
  return popular;
}
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");

  const popular = await searchPopular(page);
  return NextResponse.json(popular);
}
