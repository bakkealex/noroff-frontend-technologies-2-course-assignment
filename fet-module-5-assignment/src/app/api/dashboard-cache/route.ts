import { ACTOR_API_URL, GENRE_API_URL, MOVIE_API_URL, REVIEW_API_URL, STUDIO_API_URL } from "@/lib/constants";
import AdminMiscItem from "@/interfaces/AdminMiscItem";
import DashboardStats from "@/interfaces/DashboardStats";
import MiscItemMovies from "@/interfaces/MiscItemMovies";
import Movie from "@/interfaces/Movie";
import Review from "@/interfaces/Review";

// This API route is used to fetch the dashboard stats and relieve the load on the external API
// This cache is storing the dashboard stats in memory for 5 minutes
let cache: { data: DashboardStats; timestamp: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  console.log("📦 DASHBOARD CACHE: Request received for dashboard stats API");
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    console.log("📦 DASHBOARD CACHE: Using cached data for dashboard stats, expires:", new Date(cache.timestamp + CACHE_TTL).toLocaleString());
    return new Response(JSON.stringify(cache.data), { status: 200 });
  }

  try {
    const [moviesRes, actorsRes, genresRes, studiosRes, reviewsRes] = await Promise.all([
      fetch(MOVIE_API_URL),
      fetch(ACTOR_API_URL),
      fetch(GENRE_API_URL),
      fetch(STUDIO_API_URL),
      fetch(REVIEW_API_URL),
    ]);
    const [movies, actors, genres, studios, reviews]: [Movie[], MiscItemMovies[], MiscItemMovies[], AdminMiscItem[], Review[]] = await Promise.all([
      moviesRes.json(),
      actorsRes.json(),
      genresRes.json(),
      studiosRes.json(),
      reviewsRes.json(),
    ]);

    // Most shown genre
    let mostShownGenre = "";
    let maxGenreMovies = 0;
    genres.forEach((g: MiscItemMovies) => {
      if (g.movies && g.movies.length > maxGenreMovies) {
        maxGenreMovies = g.movies.length;
        mostShownGenre = g.name;
      }
    });

    // Most featured actor
    let mostFeaturedActor = "";
    let maxActorMovies = 0;
    actors.forEach((a: MiscItemMovies) => {
      if (a.movies && a.movies.length > maxActorMovies) {
        maxActorMovies = a.movies.length;
        mostFeaturedActor = a.name;
      }
    });

    // Most active reviewer
    const reviewerCount: Record<string, number> = {};
    reviews.forEach((r: Review) => {
      if (r.reviewerName) {
        reviewerCount[r.reviewerName] = (reviewerCount[r.reviewerName] || 0) + 1;
      }
    });
    let mostActiveReviewer = "";
    let maxReviews = 0;
    Object.entries(reviewerCount).forEach(([name, count]) => {
      if (count > maxReviews) {
        maxReviews = count;
        mostActiveReviewer = name;
      }
    });

    const newStats: DashboardStats = {
      movies: movies.length,
      actors: actors.length,
      genres: genres.length,
      studios: studios.length,
      reviews: reviews.length,
      mostShownGenre,
      mostFeaturedActor,
      mostActiveReviewer,
    };

    cache = { data: newStats, timestamp: Date.now() };
    console.log("📦 DASHBOARD CACHE: Fetched dashboard stats from API:", MOVIE_API_URL, "expires:", new Date(cache.timestamp + CACHE_TTL).toLocaleString());
    return new Response(JSON.stringify(newStats), { status: 200 });
  } catch (error) {
    console.error("📦 DASHBOARD CACHE: Error fetching dashboard stats:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch dashboard stats" }), { status: 500 });
  }
}