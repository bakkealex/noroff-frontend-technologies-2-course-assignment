"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GENRE_API_URL } from "@/lib/constants";
import AdminMiscForm from "@/components/admin/AdminMiscForm";
import BackButton from "@/components/shared/BackButton";

export default function AddGenrePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async (data: {
    name: string;
  }) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(GENRE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to add genre");
      router.push("/admin/genres"); // Redirect to genres list
    } catch {
      setError("Failed to add genre.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Add new genre</h2>
      <div className="rounded bg-white dark:bg-gray-800 p-6 shadow max-w-lg">
        <AdminMiscForm label="genre" initialValues={{ name: "" }} onSubmit={handleAdd} submitting={submitting} error={error} />
        <BackButton />
      </div>
    </div>
  );
}