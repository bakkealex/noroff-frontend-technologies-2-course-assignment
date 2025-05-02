"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ACTOR_API_URL } from "@/lib/constants";
import AdminMiscForm from "@/components/admin/AdminMiscForm";
import BackButton from "@/components/shared/BackButton";

export default function AddActorPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async (data: {
    name: string;
  }) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(ACTOR_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to add actor");
      router.push("/admin/actors"); // Redirect to actors list
    } catch {
      setError("Failed to add actor.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Add new actor</h2>
      <div className="rounded bg-white dark:bg-gray-800 p-6 shadow max-w-lg">
        <AdminMiscForm label="actor" initialValues={{ name: "" }} onSubmit={handleAdd} submitting={submitting} error={error} />
        <BackButton />
      </div>
    </div>
  );
}