import Movie from "@/interfaces/Movie";

export default function MovieDetails({ movie }: { movie: Movie }) {
  return (
    <div className="flex-1 flex flex-col">
      <h1 className="text-3xl font-bold mb-4">{movie.name}</h1>
      <p className="mb-2"><span className="font-semibold">Genre:</span> {movie.genre}</p>
      <p className="mb-2"><span className="font-semibold">Studio:</span> {movie.studio}</p>
      <p className="mb-2"><span className="font-semibold">Ticket Price:</span> ${movie.ticketPrice}</p>
    </div>
  );
}