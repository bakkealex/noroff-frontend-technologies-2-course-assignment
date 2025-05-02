export const dynamic = "force-dynamic"; // This page have to be dynamic for the build to work
import { notFound } from "next/navigation";
import { MOVIE_CACHE_API_URL } from "@/lib/constants";
import Movie from "@/interfaces/Movie";
import MovieDetails from "@/components/customer/MovieDetails";
import MoviePoster from "@/components/customer/MoviePoster";
import MovieReviews from "@/components/customer/MovieReviews";
import BackButtonClientSided from "@/components/shared/BackButtonClientSided";

async function getMovie(id: number): Promise<Movie | null> {
  // Fetch movie and cache it for 60 seconds using Next.js's built-in caching
  const res = await fetch(MOVIE_CACHE_API_URL, {
    next: { revalidate: 60 }, // Cache this request for one minute
  });
  if (!res.ok) throw new Error("Failed to fetch movies");
  const movies: Movie[] = await res.json();
  const movie = movies.find((movie) => movie.id === id) || null;
  if (!movie) return notFound(); // 404 page
  return movie;
}

export default async function MoviePage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params; // Await the promise to get the actual id value. New to Next.js 15
  const movieId = Number(id);
  if (isNaN(movieId)) return notFound(); // 404 page

  const movie = await getMovie(movieId);

  if (!movie) return notFound(); // 404 page

  return (
    <main className="max-w-3xl mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-shrink-0 flex justify-center">
          <MoviePoster />
          {/* Movie object SHOULD have been passed as a prop to MoviePoster, but no poster URL is returned from the API as of now */}
          {/* <MoviePoster movie={movie} /> */}
        </div>
        <MovieDetails movie={movie} />
        <div className="flex flex-col gap-4">
          <button className="btn-big btn-orange" title="Does not work, only a placeholder" disabled>
            Buy Tickets
          </button>
          <BackButtonClientSided />
        </div>
      </div>
      <MovieReviews reviews={movie.reviews} />
    </main>
  );
}