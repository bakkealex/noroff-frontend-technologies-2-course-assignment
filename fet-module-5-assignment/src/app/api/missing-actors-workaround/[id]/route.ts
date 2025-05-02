import { MOVIE_API_URL } from "@/lib/constants";
import Movie from "@/interfaces/Movie";

// Since the API route /api/Movies/{id} does not supply the actor array in the movie object this will be a workaround.
// This API route is not caching the data because it's part of the admin panel and should always fetch the latest data from the API.

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  console.log("🔧 Workaround API: Request received for movie with id:", id);

  // Fetch all movies from the external API
  const apiRes = await fetch(MOVIE_API_URL);
  if (!apiRes.ok) return new Response(JSON.stringify({ error: "Failed to fetch movies" }), { status: 500 });

  const data: Movie[] = await apiRes.json();

  // Find the movie with the matching id
  const movie = data.find((m) => String(m.id) === String(id));
  if (!movie) return new Response(JSON.stringify({ error: "Movie not found" }), { status: 404 });

  return new Response(JSON.stringify(movie), { status: 200 });
}