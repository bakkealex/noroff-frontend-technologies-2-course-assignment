import React from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import MovieLink from "@/components/admin/MovieLink";
import { RelatedMoviesPanelProps } from "@/types/RelatedMoviesPanelProps";

export default function RelatedMoviesPanel({
  loading,
  entity,
  initialValues,
}: RelatedMoviesPanelProps) {
  // Determine heading based on entity type
  let heading = "Related movies";
  if (entity?.type === "actor") heading = "This actor appears in these movies";
  if (entity?.type === "genre") heading = "Movies in this genre";
  if (entity?.type === "studio") heading = "Movies from this studio";

  // Get movies array if present
  const movies = entity?.movies ?? [];

  return (
    <div className="rounded bg-white dark:bg-gray-800 p-6 shadow max-w-lg flex-1">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-4">{heading}</h3>
          {initialValues && movies.length > 0 ? (
            <MovieLink movies={movies} />
          ) : (
            <div className="text-gray-600 dark:text-gray-300">No movies found for this {entity?.type ?? "entity"}.</div>
          )}
        </>
      )}
    </div>
  );
}