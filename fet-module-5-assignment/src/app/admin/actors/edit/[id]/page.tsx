"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ACTOR_API_URL } from "@/lib/constants";
import MiscItemMovie from "@/interfaces/MiscItemMovie";
import AdminMiscItem from "@/interfaces/AdminMiscItem";
import AdminMiscForm from "@/components/admin/AdminMiscForm";
import RelatedMoviesPanel from "@/components/admin/RelatedMoviesPanel";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import BackButton from "@/components/shared/BackButton";
import ErrorMessage from "@/components/shared/ErrorMessage";


export default function EditActorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params); // Use React's use function to get the params (as of Next.js 15)
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [actor, setActor] = useState<AdminMiscItem | null>(null);

  useEffect(() => {
    async function fetchActor() {
      try {
        const res = await fetch(`${ACTOR_API_URL}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch actor");
        const actor: AdminMiscItem = await res.json();
        setActor(actor);
        setInitialValues({ name: actor.name });
      } catch {
        setError("Failed to load actor.");
      } finally {
        setLoading(false);
      }
    }
    fetchActor();
  }, [id]);

  const handleEdit = async (data: { name: string }) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(ACTOR_API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Number(id),
          ...data,
        }),
      });
      if (!res.ok) throw new Error("Failed to update actor");
      router.push("/admin/actors"); // Redirect to actors list
    } catch {
      setError("Failed to update actor.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Edit actor</h2>
      <div className="flex gap-8 flex-wrap items-start">
        <div className="rounded bg-white dark:bg-gray-800 p-6 shadow max-w-lg flex-1">
          {loading ? (
            <LoadingSpinner />
          ) : initialValues ? (
            <AdminMiscForm
              label="actor"
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
          entity={actor ? ({ ...actor, type: "actor" } as { type: "actor"; movies?: MiscItemMovie[] }) : null} // Oh this was a bit tricky to get right...
          initialValues={initialValues}
        />
      </div>
    </>
  );
}