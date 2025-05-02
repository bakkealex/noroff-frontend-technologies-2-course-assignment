export const dynamic = "force-dynamic"; // This page have to be dynamic for the build to work
import { MOVIE_CACHE_API_URL } from "@/lib/constants";
import Movie from "@/interfaces/Movie";
import MovieCard from "@/components/customer/MovieCard";

async function getMovies(): Promise<Movie[]> {
  // Fetch movies and cache them for 60 seconds using Next.js's built-in caching
  const res = await fetch(MOVIE_CACHE_API_URL, {
    next: { revalidate: 60 }, // Cache this request for one minute
  });
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}

export default async function HomePage() {
  let movies: Movie[] = [];
  try {
    movies = await getMovies();
  } catch (error) {
    console.error("Error fetching movies:", error);
    // Throwing an error so the error.tsx page can display a user-friendly message
    throw error;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Now Showing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}