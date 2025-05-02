"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MOVIE_API_URL } from "@/lib/constants";
import Movie from "@/interfaces/Movie";
import RelatedInfoPanelProps from "@/interfaces/RelatedInfoPanelProps";
import AdminMovieForm from "@/components/admin/AdminMovieForm";
import RelatedInfoPanel from "@/components/admin/RelatedInfoPanel";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import BackButton from "@/components/shared/BackButton";
import ErrorMessage from "@/components/shared/ErrorMessage";

export default function EditMoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params); // Use React's use function to get the params (as of Next.js 15)
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<{
    name: string;
    ticketPrice: number;
    studioId?: number;
    genreId?: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        // const res = await fetch(`${MOVIE_API_URL}/${id}`);
        // Workaround for the issue Noroff API not returning actors array in the movie object
        const res = await fetch(`/api/missing-actors-workaround/${id}`);
        if (!res.ok) throw new Error("Failed to fetch movie");
        const movie: Movie = await res.json();
        setMovie(movie);
        console.log(movie);
        setInitialValues({
          name: movie.name,
          ticketPrice: movie.ticketPrice,
          studioId: movie.studioId,
          genreId: movie.genreId,
        });
      } catch {
        setError("Failed to load movie.");
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  const handleEdit = async (data: {
    name: string;
    ticketPrice: number;
    studioId: number;
    genreId: number;
  }) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(MOVIE_API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Number(id),
          ...data,
        }),
      });
      if (!res.ok) throw new Error("Failed to update movie");
      router.push("/admin/movies"); // Redirect to movies list
    } catch {
      setError("Failed to update movie.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Edit movie</h2>
      <div className="flex gap-8 flex-wrap items-start">
        <div className="rounded bg-white dark:bg-gray-800 p-6 shadow max-w-lg flex-1">
          {loading ? (
            <LoadingSpinner />
          ) : initialValues ? (
            <AdminMovieForm
              initialValues={initialValues}
              onSubmit={handleEdit}
              submitting={submitting}
              error={error}
            />
          ) : (
            error && <ErrorMessage message={error} />
          )}
          <BackButton />
        </div>
        <RelatedInfoPanel
          loading={loading}
          movie={movie as RelatedInfoPanelProps["movie"]} // Type assertion to satisfy TypeScript
        />
      </div>
    </>
  );
}