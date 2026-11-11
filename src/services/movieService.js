
const API_BASE_URL = "https://api.themoviedb.org/3";

// Add your TMDB API Read Access Token here
const API_TOKEN = "YOUR_TMDB_API_READ_ACCESS_TOKEN";

// Common API request function
async function fetchMovies(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                accept: "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch movies");
        }

        const data = await response.json();

        return data.results || [];

    } catch (error) {
        console.error("Movie API Error:", error);
        throw error;
    }
}

// Get trending movies
export function getTrendingMovies() {
    return fetchMovies("/trending/movie/day");
}

// Get popular movies
export function getPopularMovies() {
    return fetchMovies("/movie/popular");
}

// Get top-rated movies
export function getTopRatedMovies() {
    return fetchMovies("/movie/top_rated");
}

// Get upcoming movies
export function getUpcomingMovies() {
    return fetchMovies("/movie/upcoming");
}
