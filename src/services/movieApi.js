
const BASE_URL = "https://api.themoviedb.org/3";

// Use a newly generated token.
// Do not commit your token to GitHub.
const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmY1NWQ5NWY5NzEwNTc4OTg3YTdiZjhlYmE4ZWFmYiIsIm5iZiI6MTc5NDQ2MzU4NC43OTcsInN1YiI6IjZhZjU1NzYwZmJiNmFkY2Y0MmUyOGY0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yb-P7dTXcGBxHzWrBiJpBtNPE-Dde34fKg_9Jbr5NXc";

// Common API request function
export async function fetchMovies(endpoint, signal) {

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_TOKEN}`
        },
        signal
    });

    // Check HTTP errors
    if (!response.ok) {
        throw new Error(
            `TMDB API Error: ${response.status} ${response.statusText}`
        );
    }

    // Handle invalid JSON responses
    let data;

    try {
        data = await response.json();
    } catch {
        throw new Error("TMDB returned an invalid response.");
    }

    // Check TMDB API errors
    if (!data || data.success === false) {
        throw new Error(
            data?.status_message || "Invalid response from TMDB."
        );
    }

    return data;
}

// Get movie list safely
async function getMovieList(endpoint) {

    const data = await fetchMovies(endpoint);

    if (!Array.isArray(data.results)) {
        throw new Error("Invalid movie list received from TMDB.");
    }

    return data.results;
}

// Get trending movies
export async function getTrendingMovies() {
    return await getMovieList("/trending/movie/day");
}

// Get popular movies
export async function getPopularMovies() {
    return await getMovieList("/movie/popular");
}

// Get top rated movies
export async function getTopRatedMovies() {
    return await getMovieList("/movie/top_rated");
}

// Get upcoming movies
export async function getUpcomingMovies() {
    return await getMovieList("/movie/upcoming");
}

// Get movie genres
export async function getMovieGenres() {

    const data = await fetchMovies("/genre/movie/list");

    if (!Array.isArray(data.genres)) {
        throw new Error("Invalid movie genres received from TMDB.");
    }

    return data.genres;
}

// Get movie runtime
export async function getMovieRuntime(movieId) {

    if (!Number.isInteger(Number(movieId)) || Number(movieId) <= 0) {
        throw new Error("Invalid movie ID.");
    }

    const data = await fetchMovies(`/movie/${movieId}`);

    if (
        data.runtime !== null &&
        (typeof data.runtime !== "number" || !Number.isFinite(data.runtime))
    ) {
        throw new Error("Invalid movie runtime received from TMDB.");
    }

    return data.runtime;
}

// Search movies by title
export async function getMoviesByTitle(query, page = 1, signal) {

    if (!query.trim()) {
        throw new Error("Movie search query cannot be empty.");
    }

    if (!Number.isInteger(page) || page < 1) {
        throw new Error("Invalid search page.");
    }

    const endpoint =
        `/search/movie?query=${encodeURIComponent(query.trim())}` +
        `&page=${page}&include_adult=false`;

    const data = await fetchMovies(endpoint, signal);

    if (
        !Array.isArray(data.results) ||
        typeof data.page !== "number" ||
        typeof data.total_pages !== "number"
    ) {
        throw new Error("Invalid movie search response.");
    }

    return data;
}
