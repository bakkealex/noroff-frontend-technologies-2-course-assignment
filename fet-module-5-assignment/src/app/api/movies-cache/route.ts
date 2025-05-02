import { MOVIE_API_URL } from "@/lib/constants";
import Movie from "@/interfaces/Movie";

// This API route caches the movies data for 5 minutes to reduce the number of requests to the external API.
let cache: { data: Movie[]; timestamp: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  console.log("📦 MOVIE CACHE: Request received for movies cache API");
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    console.log("📦 MOVIE CACHE: Using cached data for movies, expires:", new Date(cache.timestamp + CACHE_TTL).toLocaleString());
    return new Response(JSON.stringify(cache.data), { status: 200 });
  }

  const apiRes = await fetch(MOVIE_API_URL);
  if (!apiRes.ok) return new Response(JSON.stringify({ error: "Failed to fetch movies" }), { status: 500 });
  const data: Movie[] = await apiRes.json();
  cache = { data, timestamp: Date.now() };
  console.log("📦 MOVIE CACHE: Fetched movies from API:", MOVIE_API_URL, "expires:", new Date(cache.timestamp + CACHE_TTL).toLocaleString());
  return new Response(JSON.stringify(data), { status: 200 });
}