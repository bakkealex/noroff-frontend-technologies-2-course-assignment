import { useEffect, useState } from "react";
import MovieFormProps from "@/interfaces/MovieFormProps";
import AdminMiscItem from "@/interfaces/AdminMiscItem";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { GENRE_API_URL, STUDIO_API_URL } from "@/lib/constants";

export default function AdminMovieForm({
  initialValues,
  onSubmit,
  submitting,
  error,
}: MovieFormProps) {
  const [name, setName] = useState(initialValues?.name || "");
  const [ticketPrice, setTicketPrice] = useState(initialValues?.ticketPrice || 0);
  const [studioId, setStudioId] = useState<number | undefined>(initialValues?.studioId);
  const [genreId, setGenreId] = useState<number | undefined>(initialValues?.genreId);
  const [studios, setStudios] = useState<AdminMiscItem[]>([]);
  const [genres, setGenres] = useState<AdminMiscItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [studiosRes, genresRes] = await Promise.all([
          fetch(STUDIO_API_URL),
          fetch(GENRE_API_URL),
        ]);
        const studiosData = await studiosRes.json();
        const genresData = await genresRes.json();
        setStudios(studiosData.map((s: AdminMiscItem) => ({ id: s.id, name: s.name })));
        setGenres(genresData.map((g: AdminMiscItem) => ({ id: g.id, name: g.name })));
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studioId || !genreId) return;
    onSubmit({
      name,
      ticketPrice,
      studioId,
      genreId,
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Movie name</label>
          <input
            type="text"
            className="w-full p-2 rounded border input-color-fix"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="w-full md:w-28">
          <label className="block font-semibold mb-1">Ticket price</label>
          <input
            type="number"
            className="w-full p-2 rounded border input-color-fix"
            value={ticketPrice}
            onChange={(e) => setTicketPrice(Number(e.target.value))}
            min={0}
            step="0.01"
            required
            inputMode="decimal"
            pattern="^\d+(\.\d{1,2})?$"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Studio</label>
          <select
            className="w-full p-2 rounded border input-color-fix"
            value={studioId ?? ""}
            onChange={(e) => setStudioId(Number(e.target.value))}
            required
          >
            <option value="" disabled>
              Select studio
            </option>
            {studios.map((studio) => (
              <option key={studio.id} value={studio.id}>
                {studio.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block font-semibold mb-1">Genre</label>
          <select
            className="w-full p-2 rounded border input-color-fix"
            value={genreId ?? ""}
            onChange={(e) => setGenreId(Number(e.target.value))}
            required
          >
            <option value="" disabled>
              Select genre
            </option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && <ErrorMessage message={error} />}
      <button
        type="submit"
        className="btn-big w-full btn-orange"
        disabled={submitting}
      >
        {submitting ? "Saving..." : "Save movie"}
      </button>
    </form>
  );
}