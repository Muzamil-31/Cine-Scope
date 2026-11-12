
import { getMovieDetails } from "../services/movieDetailsService.js";
import { renderMovieGrid } from "../components/movieGrid.js";
import { addToWatchlist } from "../storage/storageService.js";
import { addRecentlyViewed } from "../services/preferencesService.js";

const app = document.getElementById("app");

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_URL = "https://image.tmdb.org/t/p/original";
const NO_POSTER_URL = "https://placehold.co/500x750?text=No+Poster";

// Get movie ID from URL
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

async function renderMovieDetails() {
    try {
        if (!movieId) {
            throw new Error("Movie ID not found");
        }

        // Fetch movie details from TMDB
        const {
            details: movie,
            cast,
            similarMovies,
            recommendedMovies
        } = await getMovieDetails(movieId);

        // Save recently viewed movie
        addRecentlyViewed(movie);

        // Combine similar and recommended movies without duplicates
        const relatedMovies = [
            ...new Map([
                ...similarMovies,
                ...recommendedMovies
            ].filter(item => item.id !== movie.id)
             .map(item => [item.id, item])).values()
        ].slice(0, 10);

        // Get genres
        const genres = movie.genres || [];

        app.innerHTML = `
            <main class="bg-white dark:bg-gray-950 text-gray-900 dark:text-white min-h-screen">

                <!-- Backdrop -->
                <section
                    class="relative min-h-[550px] bg-gray-950 bg-cover bg-top text-white"
                    style="background-image: url('${movie.backdrop_path ? BACKDROP_URL + movie.backdrop_path : ""}')"
                >

                    <div class="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent"></div>
                    <div class="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent"></div>

                    <div class="relative max-w-7xl mx-auto px-6 py-12">

                        <a href="index.html" class="text-gray-300 hover:text-red-500">
                            ← Back to Home
                        </a>

                        <div class="flex flex-col md:flex-row gap-10 items-center md:items-end mt-12">

                            <!-- Poster -->
                            <img
                                src="${movie.poster_path ? IMAGE_URL + movie.poster_path : NO_POSTER_URL}"
                                alt="${movie.title}"
                                class="w-64 rounded-xl shadow-2xl"
                            >

                            <!-- Movie Information -->
                            <div class="max-w-2xl">

                                <h1 class="text-4xl md:text-5xl font-bold mb-5">
                                    ${movie.title}
                                </h1>

                                <div class="flex flex-wrap gap-5 text-gray-300 mb-5">
                                    <span>${movie.release_date || "N/A"}</span>
                                    <span>⏱ ${movie.runtime || "N/A"} min</span>
                                    <span>⭐ ${movie.vote_average?.toFixed(1) || "N/A"}</span>
                                </div>

                                <div class="flex flex-wrap gap-2 mb-6">
                                    ${genres.map(genre => `
                                        <span class="bg-gray-800 px-3 py-1 rounded-full text-sm">
                                            ${genre.name}
                                        </span>
                                    `).join("")}
                                </div>

                                <h2 class="text-xl font-semibold mb-3">
                                    Overview
                                </h2>

                                <p class="text-gray-300 leading-7">
                                    ${movie.overview || "Overview not available."}
                                </p>

                                <button
                                    id="addWatchlist"
                                    class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg mt-7"
                                >
                                    + Add to Watchlist
                                </button>

                            </div>
                        </div>
                    </div>
                </section>

                <!-- Cast -->
                <section class="max-w-7xl mx-auto px-6 py-12">

                    <h2 class="text-2xl font-bold mb-6">
                        Top Cast
                    </h2>

                    <div class="flex flex-wrap gap-4">

                        ${cast.length > 0
                            ? cast.slice(0, 10).map(actor => `
                                <div class="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 w-40">

                                    <h3 class="font-semibold">
                                        ${actor.name}
                                    </h3>

                                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                        ${actor.character || ""}
                                    </p>

                                </div>
                            `).join("")
                            : `<p class="text-gray-500 dark:text-gray-400">Cast information not available.</p>`
                        }

                    </div>
                </section>

                <!-- Similar and Recommended Movies -->
                <section class="max-w-7xl mx-auto px-6 pb-16">

                    <h2 class="text-2xl font-bold mb-6">
                        Similar & Recommended Movies
                    </h2>

                    ${relatedMovies.length > 0
                        ? renderMovieGrid(relatedMovies)
                        : `<p class="text-gray-500 dark:text-gray-400">No similar movies available.</p>`
                    }

                </section>

            </main>
        `;

        // Add movie to watchlist
        document.getElementById("addWatchlist").addEventListener("click", () => {
            const result = addToWatchlist(movie);

            if (result === "added") {
                alert("Movie added to watchlist!");
            } else if (result === "duplicate") {
                alert("Movie is already in your watchlist.");
            } else {
                alert("Could not save the movie to your watchlist.");
            }
        });

    } catch (error) {
        console.error("Movie Details Error:", error);

        const errorMessage =
            error.message === "Invalid movie ID." ||
            error.message === "Movie ID not found"
                ? "The movie ID is invalid or missing."
                : "Please check your internet connection and try again.";

        app.innerHTML = `
            <div class="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white flex flex-col items-center justify-center">

                <h2 class="text-3xl font-bold mb-3">
                    Unable to load movie
                </h2>

                <p class="text-gray-600 dark:text-gray-400">
                    ${errorMessage}
                </p>

                <a href="index.html" class="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg mt-5">
                    Back to Home
                </a>

            </div>
        `;
    }
}

// Navigate to similar movie details
document.addEventListener("click", event => {
    const card = event.target.closest("[data-movie-id]");

    if (card) {
        window.location.href = `details.html?id=${card.dataset.movieId}`;
    }
});

renderMovieDetails();
