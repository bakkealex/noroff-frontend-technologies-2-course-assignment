import Link from "next/link";
import Image from "next/image";
import CustomerMovie from "@/interfaces/CustomerMovie";

export default function MovieCard({ movie }: { movie: CustomerMovie }) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition h-full flex flex-col">
      <div className="flex flex-col lg:flex-row gap-8 mb-8 flex-1">
        <div className="flex-shrink-0 flex justify-center items-start lg:items-center mb-4 lg:mb-0">
          <Image
            src="/placeholder.png"
            alt="Movie Poster"
            width={120}
            height={180}
            className="rounded shadow object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <h2 className="text-xl font-bold mb-2">{movie.name}</h2>
          <p className="mb-2">Ticket Price: ${movie.ticketPrice}</p>
        </div>
      </div>
      <Link
        href={`/movie/${movie.id}`}
        className="block w-full btn-big btn-orange mt-2 text-center"
      >
        🎬 View Details
      </Link>
    </div>
  );
}