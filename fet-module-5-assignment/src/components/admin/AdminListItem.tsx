import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminListProps from "@/interfaces/AdminListProps";
import MiscItemMovies from "@/interfaces/MiscItemMovies";
import ErrorMessage from "@/components/shared/ErrorMessage";

export default function AdminListItem({
  item,
  resource,
  onDelete,
  error
}: AdminListProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Check if item has movies and cannot be deleted
  const hasMovies = Array.isArray((item as MiscItemMovies).movies) && (item as MiscItemMovies).movies.length > 0;

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 rounded shadow p-4 mb-3">
      <div className="flex items-center justify-between">
        {resource === "movies" && (
          <div className="flex gap-4">
            <Image
              src="/placeholder.png"
              alt="Movie Poster"
              width={60}
              height={90}
              className="rounded shadow object-cover me-2"
            />
            {/* Placeholder image, should be replaced with actual movie poster URL when available */}
          </div>
        )}
        <div className="flex flex-col flex-1 ms-2 ">
          <div className="font-bold text-lg">{item.name}</div>
          {resource === "movies" && (<div className="text-gray-500 dark:text-gray-300">Ticket Price: ${item.ticketPrice}</div>)}
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/${resource}/edit/${item.id}`} className="btn btn-blue">
            Edit
          </Link>
          <button
            onClick={() => setShowConfirm((prev) => !prev)}
            className="btn btn-red"
            disabled={hasMovies}
            title={hasMovies ? "Cannot delete: This item is used by movies." : "Delete"}
          >
            Delete
          </button>
        </div>
      </div>
      {showConfirm && !hasMovies && (
        <div className="mt-4 bg-red-100 dark:bg-red-900 p-3 rounded flex flex-col md:flex-row md:items-center md:justify-between">
          <span className="text-red-700 dark:text-red-200 font-semibold">
            Are you sure you want to delete <span className="font-bold">{item.name}</span>?
          </span>
          <div className="flex gap-2 mt-2 md:mt-0">
            <button
              onClick={async () => {
                setDeleting(true);
                await onDelete(item.id);
                setDeleting(false);
              }}
              className="btn btn-red"
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Yes, Delete"}
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="btn btn-gray"
              disabled={deleting}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {showConfirm && error && <ErrorMessage message={error} />}
    </div>
  );
}