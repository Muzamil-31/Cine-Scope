
import { renderMovieCard } from "../components/movieCard.js";

import {
    getWatchlist,
    removeFromWatchlist,
    toggleWatched
} from "../storage/storageService.js";
import { initializeTheme } from "../services/preferencesService.js";
import {
    initializeThemeToggle,
    renderPageHeader
} from "../components/themeToggle.js";

const app = document.getElementById("app");
initializeTheme();

function renderWatchlist() {
    const movies = getWatchlist();

    const unwatchedMovies = movies.filter(movie => !movie.watched);
    const watchedMovies = movies.filter(movie => movie.watched);

    app.innerHTML = `
        ${renderPageHeader()}

        <main class="bg-white dark:bg-gray-950 text-gray-900 dark:text-white min-h-screen p-5">

            <div class="max-w-7xl mx-auto">

                <h1 class="text-3xl font-bold my-6">
                    My Watchlist
                </h1>

                <!-- Unwatched Movies -->
                <section class="mb-12">

                    <h2 class="text-2xl font-bold mb-6">
                        Unwatched Movies (${unwatchedMovies.length})
                    </h2>

                    ${unwatchedMovies.length > 0
                        ? `
                            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">

                                ${unwatchedMovies.map(movie => `
                                    <div class="min-w-0">

                                        ${renderMovieCard(movie)}

                                       <div class="grid grid-cols-2 gap-2 mt-3">
    <button
        data-action="unwatched"
        data-id="${movie.id}"
        class="w-full bg-yellow-600 hover:bg-yellow-700 text-white text-xs sm:text-sm px-2 py-2 rounded">
        Unwatched
    </button>

    <button
        data-action="remove"
        data-id="${movie.id}"
        class="w-full bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm px-2 py-2 rounded">
        Remove
    </button>
</div>

                                    </div>
                                `).join("")}

                            </div>
                        `
                        : '<p class="text-gray-600 dark:text-gray-400">No unwatched movies.</p>'
                    }

                </section>

                <!-- Watched Movies -->
                <section>

                    <h2 class="text-2xl font-bold mb-6">
                        Watched Movies (${watchedMovies.length})
                    </h2>

                    ${watchedMovies.length > 0
                        ? `
                            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">

                                ${watchedMovies.map(movie => `
                                    <div class="min-w-0">

                                        ${renderMovieCard(movie)}

<div class="grid grid-cols-2 gap-2 mt-3">
    <button
        data-action="unwatched"
        data-id="${movie.id}"
        class="w-full bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm px-2 py-2 rounded">
        Watched
    </button>

    <button
        data-action="remove"
        data-id="${movie.id}"
        class="w-full bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm px-2 py-2 rounded">
        Remove
    </button>
</div>

                                    </div>
                                `).join("")}

                            </div>
                        `
                        : '<p class="text-gray-600 dark:text-gray-400">No watched movies.</p>'
                    }

                </section>

            </div>

        </main>
    `;

    initializeThemeToggle();
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
