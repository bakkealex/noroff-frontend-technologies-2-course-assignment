// Base URL for the API
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Endpoint for fetching actors
export const ACTOR_API_URL = `${API_URL}/Actor`;

// Endpoint for updating ActorMovies
export const ACTOR_MOVIES_API_URL = `${API_URL}/ActorMovies`;

// Endpoint for fetching genres
export const GENRE_API_URL = `${API_URL}/Genre`;

// Endpoint for fetching movies
export const MOVIE_API_URL = `${API_URL}/Movies`;

// Endpoint for fetching reviews
export const REVIEW_API_URL = `${API_URL}/Review`;

// Endpoint for fetching studios
export const STUDIO_API_URL = `${API_URL}/Studio`;

// Endpoint for users
export const USER_API_URL = `${API_URL}/User`;

// Endpoint for movies cache
export const MOVIE_CACHE_API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies-cache`;

// Endpoint for dashboard cache
export const DASHBOARD_CACHE_API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard-cache`;