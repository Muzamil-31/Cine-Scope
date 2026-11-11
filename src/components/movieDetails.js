
import { renderMovieCard } from "./movieCard.js";

const IMAGE_URL = "https://image.tmdb.org/t/p/";

export function renderMovieDetails(movieData) {

    const {
        details,
        cast,
        similarMovies,
        recommendedMovies
    } = movieData;

    const poster = details.poster_path
        ? `${IMAGE_URL}w500${details.poster_path}`
        : "https://placehold.co/500x750?text=No+Poster";

    const backdrop = details.backdrop_path
        ? `${IMAGE_URL}original${details.backdrop_path}`
        : "";

    const genres = details.genres
        .map(genre => genre.name)
        .join(", ");

    const runtime = details.runtime
        ? `${details.runtime} min`
        : "N/A";

    const rating = details.vote_average
        ? details.vote_average.toFixed(1)
        : "N/A";

    // Convert TMDB movie data into your movie card format
    function formatMovies(movies) {
        return movies.slice(0, 10).map(movie => ({
            id: movie.id,
            poster: movie.poster_path
                ? `${IMAGE_URL}w500${movie.poster_path}`
                : "https://placehold.co/500x750?text=No+Poster",
            title: movie.title,
            year: movie.release_date
                ? movie.release_date.substring(0, 4)
                : "N/A",
            rating: movie.vote_average
                ? movie.vote_average.toFixed(1)
                : "N/A"
        }));
    }

    const similar = formatMovies(similarMovies);
    const recommended = formatMovies(recommendedMovies);

    return `
        <main class="pb-12">

            <!-- Movie Backdrop -->
            <section
                class="relative min-h-[550px] bg-cover bg-center"
                style="background-image: url('${backdrop}')"
            >

                <div class="absolute inset-0 backdrop-overlay"></div>

                <div class="relative z-10 max-w-7xl mx-auto px-5 py-16 flex flex-col md:flex-row items-center md:items-end gap-8">

                    <!-- Poster -->
                    <img
                        src="${poster}"
                        alt="${details.title}"
                        class="w-56 rounded-lg shadow-2xl"
                    >

                    <!-- Movie Information -->
                    <div class="max-w-3xl">

                        <h1 class="text-3xl md:text-5xl font-bold mb-4">
                            ${details.title}
                        </h1>

                        <p class="text-gray-300 leading-relaxed mb-5">
                            ${details.overview || "No overview available."}
                        </p>

                        <div class="flex flex-wrap gap-5 text-sm text-gray-300 mb-4">

                            <span>
                                📅 ${details.release_date || "N/A"}
                            </span>

                            <span>
                                ⏱ ${runtime}
                            </span>

                            <span class="text-yellow-400">
                                ⭐ ${rating}/10
                            </span>

                        </div>

                        <p class="text-gray-300">
                            <strong>Genres:</strong>
                            ${genres || "N/A"}
                        </p>

                    </div>

                </div>

            </section>

            <!-- Cast Section -->
            <section class="max-w-7xl mx-auto px-5 mt-12">

                <h2 class="text-2xl font-bold mb-6">
                    Top Cast
                </h2>

                <div class="flex gap-4 overflow-x-auto movie-scroll pb-4">

                    ${
                        cast.length > 0
                            ? cast.slice(0, 12).map(actor => `
                                <div class="min-w-[140px] shrink-0 bg-gray-900 rounded-lg overflow-hidden">

                                    <img
                                        src="${
                                            actor.profile_path
                                                ? IMAGE_URL + "w185" + actor.profile_path
                                                : "https://placehold.co/185x278?text=No+Image"
                                        }"
                                        alt="${actor.name}"
                                        loading="lazy"
                                        class="w-full h-[180px] object-cover"
                                    >

                                    <div class="p-3">

                                        <h3 class="font-semibold text-sm truncate">
                                            ${actor.name}
                                        </h3>

                                        <p class="text-gray-400 text-xs mt-1 truncate">
                                            ${actor.character || "Unknown"}
                                        </p>

                                    </div>

                                </div>
                            `).join("")
                            : `<p class="text-gray-400">Cast information unavailable.</p>`
                    }

                </div>

            </section>

            <!-- Similar Movies -->
            <section class="max-w-7xl mx-auto px-5 mt-12">

                <h2 class="text-2xl font-bold mb-6">
                    Similar Movies
                </h2>

                <div class="flex gap-4 overflow-x-auto movie-scroll pb-4">

                    ${
                        similar.length > 0
                            ? similar.map(movie => renderMovieCard(movie)).join("")
                            : `<p class="text-gray-400">No similar movies found.</p>`
                    }

                </div>

            </section>

            <!-- Recommended Movies -->
            <section class="max-w-7xl mx-auto px-5 mt-12">

                <h2 class="text-2xl font-bold mb-6">
                    Recommended Movies
                </h2>

                <div class="flex gap-4 overflow-x-auto movie-scroll pb-4">

                    ${
                        recommended.length > 0
                            ? recommended.map(movie => renderMovieCard(movie)).join("")
                            : `<p class="text-gray-400">No recommendations found.</p>`
                    }

                </div>

            </section>

        </main>
    `;
}
