"use client";
export const dynamic = "force-dynamic"; // This page have to be dynamic for the build to work
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import DashboardStats from "@/interfaces/DashboardStats";
import { DASHBOARD_CACHE_API_URL } from "@/lib/constants";

// This page is using localStorage to cache the dashboard stats for 4 minutes to show that it is possible to cache data in the client-side as well.
// This is not a good practice for production code, but it is a good example of how to use localStorage to cache data in the client-side.
const LOCAL_CACHE_KEY = "admin_dashboard_stats";
const CACHE_TTL = 4 * 60 * 1000; // 4 minutes

export default function AdminDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    movies: 0,
    actors: 0,
    genres: 0,
    studios: 0,
    reviews: 0,
    mostShownGenre: "",
    mostFeaturedActor: "",
    mostActiveReviewer: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);

      // Check if we are running i a browser and have cached data in localStorage and if it is still valid
      const cached = typeof window !== "undefined" ? localStorage.getItem(LOCAL_CACHE_KEY) : null;
      if (cached) {
        const { data, timestamp } = JSON.parse(cached) as { data: DashboardStats; timestamp: number };
        if (Date.now() - timestamp < CACHE_TTL) {
          setStats(data);
          setLoading(false);
          return;
        }
      }

      // Fetch from API if no valid cache is found
      try {
        const res = await fetch(DASHBOARD_CACHE_API_URL, { next: { revalidate: 240 } }); // Cache this request for 4 minutes
        if (!res.ok) throw new Error("Failed to fetch dashboard stats");
        const data: DashboardStats = await res.json();
        setStats(data);
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    fetchStats();
  }, []);

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Total movies</h2>
        <div className="text-3xl font-bold text-blue-600 min-h-[2.5rem] flex items-center justify-center">
          {loading ? <LoadingSpinner /> : stats.movies}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Total actors</h2>
        <div className="text-3xl font-bold text-purple-600 min-h-[2.5rem] flex items-center justify-center">
          {loading ? <LoadingSpinner /> : stats.actors}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Total genres</h2>
        <div className="text-3xl font-bold text-pink-600 min-h-[2.5rem] flex items-center justify-center">
          {loading ? <LoadingSpinner /> : stats.genres}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Total studios</h2>
        <div className="text-3xl font-bold text-green-600 min-h-[2.5rem] flex items-center justify-center">
          {loading ? <LoadingSpinner /> : stats.studios}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Total reviews</h2>
        <div className="text-3xl font-bold text-yellow-600 min-h-[2.5rem] flex items-center justify-center">
          {loading ? <LoadingSpinner /> : stats.reviews}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Most shown genre</h2>
        <div className="text-lg">
          {loading ? <LoadingSpinner /> : stats.mostShownGenre || "N/A"}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Most featured actor</h2>
        <div className="text-lg">
          {loading ? <LoadingSpinner /> : stats.mostFeaturedActor || "N/A"}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Most active reviewer</h2>
        <div className="text-lg">
          {loading ? <LoadingSpinner /> : stats.mostActiveReviewer || "N/A"}
        </div>
      </div>
    </div>
  );
}