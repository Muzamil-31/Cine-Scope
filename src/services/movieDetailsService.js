
const API_URL = "https://api.themoviedb.org/3";

const API_TOKEN = "YOUR_TMDB_API_READ_ACCESS_TOKEN";

export async function getMovieDetails(movieId) {
    try {
        const response = await fetch(
            `${API_URL}/movie/${movieId}?append_to_response=credits,similar,recommendations`,
            {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    accept: "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch movie details");
        }

        const data = await response.json();

        return {
            details: data,
            cast: data.credits?.cast || [],
            similarMovies: data.similar?.results || [],
            recommendedMovies: data.recommendations?.results || []
        };

    } catch (error) {
        console.error("Movie Details Error:", error);
        throw error;
    }
}
