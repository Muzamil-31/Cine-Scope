import {
    trendingMovies,
    popularMovies,
    topRatedMovies,
    upcomingMovies
} from "../data/movies.js";

import { addToWatchlist } from "../storage/storageService.js";
import { addRecentlyViewed } from "../services/preferencesService.js";
const app = document.getElementById("app");

const allMovies = [
    ...new Map([
        ...trendingMovies,
        ...popularMovies,
        ...topRatedMovies,
        ...upcomingMovies
    ].map(movie => [movie.id, movie])).values()
];

// Get movie ID from URL
const params = new URLSearchParams(window.location.search);
const movieId = Number(params.get("id"));

// Find selected movie
const movie = allMovies.find(item => item.id === movieId);
// Save recently viewed movie
if (movie) {
    addRecentlyViewed(movie);
}
function renderMovieDetails() {

    if (!movie) {
        app.innerHTML = `
            <h2 class="text-white text-center text-3xl py-20">
                Movie Not Found
            </h2>
        `;
        return;
    }

    // Get similar movies
    const similarMovies = allMovies.filter(item =>
        item.id !== movie.id &&
        item.genre === movie.genre
    );

    // Get genres
    const genres = Array.isArray(movie.genres)
        ? movie.genres
        : [movie.genre].filter(Boolean);

    // Get cast
    const cast = movie.cast || [];

    app.innerHTML = `
        <main class="bg-gray-950 text-white min-h-screen">

            <!-- Backdrop -->
            <section
                class="relative min-h-[600px] bg-cover bg-center"
                style="background-image: url('${movie.backdrop}')"
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
                            src="${movie.poster}"
                            alt="${movie.title}"
                            class="w-64 rounded-xl shadow-2xl"
                        >

                        <!-- Movie Information -->
                        <div class="max-w-2xl">

                            <h1 class="text-4xl md:text-5xl font-bold mb-5">
                                ${movie.title}
                            </h1>

                            <div class="flex flex-wrap gap-5 text-gray-300 mb-5">
                                <span> ${movie.releaseDate || movie.year}</span>
                                <span>⏱ ${movie.runtime} min</span>
                                <span>⭐ ${movie.rating}</span>
                            </div>

                            <div class="flex flex-wrap gap-2 mb-6">
                                ${genres.map(genre => `
                                    <span class="bg-gray-800 px-3 py-1 rounded-full text-sm">
                                        ${genre}
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
                                class="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg mt-7"
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
                        ? cast.map(actor => `
                            <div class="bg-gray-900 rounded-lg p-4 w-40">
                                <h3 class="font-semibold">
                                    ${typeof actor === "string" ? actor : actor.name}
                                </h3>
                                ${typeof actor === "object" && actor.character
                                    ? `<p class="text-sm text-gray-400 mt-2">${actor.character}</p>`
                                    : ""}
                            </div>
                        `).join("")
                        : `<p class="text-gray-400">Cast information not available.</p>`
                    }

                </div>

            </section>

            <!-- Similar Movies -->
            <section class="max-w-7xl mx-auto px-6 pb-16">

                <h2 class="text-2xl font-bold mb-6">
                    Similar & Recommended Movies
                </h2>

                <div class="flex gap-5 overflow-x-auto pb-5">

                    ${similarMovies.length > 0
                        ? similarMovies.map(item => `
                            <div
                                data-movie-id="${item.id}"
                                class="min-w-[160px] md:min-w-[200px] cursor-pointer"
                            >
                                <img
                                    src="${item.poster}"
                                    alt="${item.title}"
                                    loading="lazy"
                                    class="w-full h-[250px] object-cover rounded-lg"
                                >

                                <h3 class="font-semibold mt-3">
                                    ${item.title}
                                </h3>

                                <p class="text-sm text-gray-400 mt-1">
                                    ⭐ ${item.rating}
                                </p>
                            </div>
                        `).join("")
                        : `<p class="text-gray-400">No similar movies available.</p>`
                    }

                </div>

            </section>

        </main>
    `;

    // Add to watchlist
    document.getElementById("addWatchlist").addEventListener("click", () => {
        const added = addToWatchlist(movie);

        if (added) {
            alert("Movie added to watchlist!");
        }
    });
}

// Navigate to similar movie details
document.addEventListener("click", event => {
    const card = event.target.closest("[data-movie-id]");

    if (card) {
        window.location.href = `details.html?id=${card.dataset.movieId}`;
    }
});

renderMovieDetails();
