import React from "react";
import Link from "next/link";
import MiscItemMovie from "@/interfaces/MiscItemMovie";

export default function MovieLink({ movies }: { movies: MiscItemMovie[] }) {
  if (!movies || movies.length === 0) {
    return <div className="text-gray-600 dark:text-gray-300">No movies found.</div>; // This shouldn't be possible, but just in case
  }
  return (
    <>
      <ul className="flex flex-col gap-2">
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link
              href={`/admin/movies/edit/${movie.id}`}
              className="block btn btn-gray px-4 py-2 text-sm text-center font-semibold"
            >
              {movie.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-sm text-gray-600 dark:text-gray-300">
        {movies.length} {movies.length === 1 ? "movie" : "movies"} found, so this entry cannot be deleted.
      </div>
    </>
  );
}