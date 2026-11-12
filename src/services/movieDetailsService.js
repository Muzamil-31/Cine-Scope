
import { fetchMovies } from "./movieApi.js";

export async function getMovieDetails(movieId) {

    try {

        const data = await fetchMovies(
            `/movie/${movieId}?append_to_response=credits,similar,recommendations`
        );

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
