import React from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import RelatedButton from "@/components/admin/RelatedButton";
import RelatedInfoPanelProps from "@/interfaces/RelatedInfoPanelProps";

export default function RelatedInfoPanel({
  loading,
  movie
}: RelatedInfoPanelProps) {
  return (
    <div className="rounded bg-white dark:bg-gray-800 p-6 shadow max-w-lg flex-1">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-4">Information</h3>
          <div className="mb-4">
            <div className="font-semibold mb-1">Actors in this movie:</div>
            {movie.actor && movie.actor.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {movie.actor.map((actor) => (
                  <li key={actor.id}>
                    <RelatedButton href={`/admin/actors/edit/${actor.id}`}>
                      {actor.name}
                    </RelatedButton>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-600 dark:text-gray-300">No actors listed for this movie.</div>
            )}
          </div>
          <div className="mb-4">
            <div className="font-semibold mb-1">Genre:</div>
            <RelatedButton href={`/admin/genres/edit/${movie.genreId}`}>
              {movie.genre}
            </RelatedButton>
          </div>
          <div>
            <div className="font-semibold mb-1">Studio:</div>
            <RelatedButton href={`/admin/studios/edit/${movie.studioId}`}>
              {movie.studio}
            </RelatedButton>
          </div>
          <p className="mt-6 text-sm text-gray-600 dark:text-gray-300">
            To edit any of the information above, click the appropriate button.
          </p>
        </>
      )}
    </div>
  );
}