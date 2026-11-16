import { fetchMovies } from "./movieApi.js";

export async function getMovieDetails(movieId) {

    const id = Number(movieId);

    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Invalid movie ID.");
    }

    const data = await fetchMovies(
        `/movie/${id}?append_to_response=credits,similar,recommendations`
    );

    return {
        details: data,
        cast: data.credits?.cast || [],
        similarMovies: data.similar?.results || [],
        recommendedMovies: data.recommendations?.results || []
    };

}
