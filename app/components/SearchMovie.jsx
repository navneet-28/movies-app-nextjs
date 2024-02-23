"use client";

import Link from "next/link";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchMovie() {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/search?query=${query}`);
    const movie = await response.json();
    // window.location.href = `/SearchResults?query=${query}`;
  };
  const handleChange = async (e) => {
    e.preventDefault();
    setQuery(e);
    const response = await fetch(`/api/search?query=${query}`);
    const movie = await response.json();
  };

  return (
    <div className="text-center my-2">
      <form onSubmit={handleSubmit}>
        <input
          className="text-black border-2 border-black rounded-full px-3 py-2"
          type="text"
          placeholder="Search movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
  );
}
