
import { renderMovieGrid } from "../components/movieGrid.js";

import {
    getWatchlist,
    removeFromWatchlist,
    toggleWatched
} from "../storage/storageService.js";

const app = document.getElementById("app");

function renderWatchlist() {

    const movies = getWatchlist();

    const unwatchedMovies = movies.filter(movie => !movie.watched);
    const watchedMovies = movies.filter(movie => movie.watched);

    app.innerHTML = `
        <main class="p-5">

            <a href="index.html" class="text-red-500">
                ← Back to Home
            </a>

            <h1 class="text-3xl font-bold my-6">
                My Watchlist
            </h1>

            <!-- Unwatched Movies -->
            <section class="mb-10">

                <h2 class="text-2xl font-bold mb-5">
                    Unwatched Movies (${unwatchedMovies.length})
                </h2>

                ${unwatchedMovies.length > 0
                    ? renderMovieGrid(unwatchedMovies)
                    : '<p class="text-gray-400">No unwatched movies.</p>'
                }

                <div class="flex flex-wrap gap-3 mt-4">
                    ${unwatchedMovies.map(movie => `
                        <div class="flex gap-2">
                            <button
                                data-action="watched"
                                data-id="${movie.id}"
                                class="bg-green-600 px-3 py-2 rounded">
                                Mark Watched
                            </button>

                            <button
                                data-action="remove"
                                data-id="${movie.id}"
                                class="bg-red-600 px-3 py-2 rounded">
                                Remove
                            </button>
                        </div>
                    `).join("")}
                </div>

            </section>

            <!-- Watched Movies -->
            <section>

                <h2 class="text-2xl font-bold mb-5">
                    Watched Movies (${watchedMovies.length})
                </h2>

                ${watchedMovies.length > 0
                    ? renderMovieGrid(watchedMovies)
                    : '<p class="text-gray-400">No watched movies.</p>'
                }

                <div class="flex flex-wrap gap-3 mt-4">
                    ${watchedMovies.map(movie => `
                        <div class="flex gap-2">
                            <button
                                data-action="unwatched"
                                data-id="${movie.id}"
                                class="bg-yellow-600 px-3 py-2 rounded">
                                Mark Unwatched
                            </button>

                            <button
                                data-action="remove"
                                data-id="${movie.id}"
                                class="bg-red-600 px-3 py-2 rounded">
                                Remove
                            </button>
                        </div>
                    `).join("")}
                </div>

            </section>

        </main>
    `;
}

// Handle watchlist actions
app.addEventListener("click", event => {

    const button = event.target.closest("[data-action]");

    if (!button) return;

    const movieId = Number(button.dataset.id);
    const action = button.dataset.action;

    if (action === "watched" || action === "unwatched") {
        toggleWatched(movieId);
    }

    if (action === "remove") {
        removeFromWatchlist(movieId);
    }

    renderWatchlist();
});

renderWatchlist();
