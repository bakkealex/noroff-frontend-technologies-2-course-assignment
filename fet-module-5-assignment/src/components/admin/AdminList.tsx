"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { GENRE_API_URL, MOVIE_API_URL, ACTOR_API_URL, STUDIO_API_URL } from "@/lib/constants";
import AdminMiscItem from "@/interfaces/AdminMiscItem";
import MiscItemMovies from "@/interfaces/MiscItemMovies";
import AdminListItem from "@/components/admin/AdminListItem";
import { AnimatePresence, motion } from "motion/react"

// Just using type on this component, so didn't see the need to create a separate file for the type
type ResourceType = "movies" | "genres" | "actors" | "studios";

const apiUrlMap: Record<ResourceType, string> = {
  movies: MOVIE_API_URL,
  genres: GENRE_API_URL,
  actors: ACTOR_API_URL,
  studios: STUDIO_API_URL,
};

export default function AdminList({
  resource,
}: {
  resource: ResourceType;
}) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<AdminMiscItem[]>([]);
  const [errorMap, setErrorMap] = useState<Record<number, string | null>>({});

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setErrorMap({});
      try {
        const res = await fetch(apiUrlMap[resource], { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch items");
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Could not load items: ", error);
        // Handling the error message on the item, not the top of the list.
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [resource]);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${apiUrlMap[resource]}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete item");
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Could not delete item: ", error);
      setErrorMap((prev) => ({ ...prev, [id]: "Could not delete item." }));
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage {resource}</h2>
        <Link
          href={`/admin/${resource}/add`}
          className="btn-big btn-orange"
        >
          + Add new
        </Link>
      </div>
      <div>
        {loading ? (
          <LoadingSpinner />
        ) : items.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-300">No {resource} found.</div>
        ) : (
          <AnimatePresence>
            {items.map((item) => (
              // AnimatePresence is used to animate the exit of the item when it is deleted.
              // It was jarring to have the item just disappear without any animation.
              // https://framermotionexamples.com/example/animate-presence
              // https://motion.dev/docs/react-animate-presence
              <motion.div
                key={item.id}
                initial={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
                transition={{ opacity: { duration: 0.2 }, height: { duration: 0.3 } }}
                style={{ overflow: "hidden" }}
              >
                <AdminListItem key={item.id} item={item as MiscItemMovies} resource={resource} onDelete={handleDelete} error={errorMap[item.id] || null} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </>
  );
}