"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { STUDIO_API_URL } from "@/lib/constants";
import MiscItemMovie from "@/interfaces/MiscItemMovie";
import AdminMiscItem from "@/interfaces/AdminMiscItem";
import AdminMiscForm from "@/components/admin/AdminMiscForm";
import RelatedMoviesPanel from "@/components/admin/RelatedMoviesPanel";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import BackButton from "@/components/shared/BackButton";
import ErrorMessage from "@/components/shared/ErrorMessage";

export default function EditStudioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params); // Use React's use function to get the params (as of Next.js 15)
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [studio, setStudio] = useState<AdminMiscItem | null>(null);

  useEffect(() => {
    async function fetchStudio() {
      try {
        const res = await fetch(`${STUDIO_API_URL}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch studio");
        const studio: AdminMiscItem = await res.json();
        setStudio(studio);
        setInitialValues({ name: studio.name });
      } catch {
        setError("Failed to load studio.");
      } finally {
        setLoading(false);
      }
    }
    fetchStudio();
  }, [id]);

  const handleEdit = async (data: { name: string }) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(STUDIO_API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Number(id),
          ...data,
        }),
      });
      if (!res.ok) throw new Error("Failed to update studio");
      router.push("/admin/studios"); // Redirect to studios list
    } catch {
      setError("Failed to update studio.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Edit studio</h2>
      <div className="flex gap-8 flex-wrap items-start">
        <div className="rounded bg-white dark:bg-gray-800 p-6 shadow max-w-lg flex-1">
          {loading ? (
            <LoadingSpinner />
          ) : initialValues ? (
            <AdminMiscForm
              label="studio"
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
        <RelatedMoviesPanel
          loading={loading}
          entity={studio ? ({ ...studio, type: "studio" } as { type: "studio"; movies?: MiscItemMovie[] }) : null} // Oh this was a bit tricky to get right...
          initialValues={initialValues}
        />
      </div>
    </>
  );
}