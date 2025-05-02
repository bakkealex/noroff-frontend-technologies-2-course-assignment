"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MOVIE_API_URL } from "@/lib/constants";
import AdminMovieForm from "@/components/admin/AdminMovieForm";
import BackButton from "@/components/shared/BackButton";

export default function AddMoviePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async (data: {
    name: string;
    ticketPrice: number;
    studioId: number;
    genreId: number;
  }) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(MOVIE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to add movie");
      router.push("/admin/movies"); // Redirect to movies list
    } catch {
      setError("Failed to add movie.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Add new movie</h2>
      <div className="rounded bg-white dark:bg-gray-800 p-6 shadow max-w-lg">
        <AdminMovieForm onSubmit={handleAdd} submitting={submitting} error={error} />
        <BackButton />
      </div>
    </div>
  );
}