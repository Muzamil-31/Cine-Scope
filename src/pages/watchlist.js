
import {
    getWatchlist,
    removeFromWatchlist,
    toggleWatched
} from "../storage/storageService.js";

import { renderMovieCard } from "../components/movieCard.js";

const app = document.getElementById("app");

function renderWatchlist() {

    const movies = getWatchlist();

    const unwatchedMovies = movies.filter(movie => !movie.watched);
    const watchedMovies = movies.filter(movie => movie.watched);

    let unwatchedHTML = "";
    let watchedHTML = "";

    // Display unwatched movies
    for (let i = 0; i < unwatchedMovies.length; i++) {

        const movie = unwatchedMovies[i];

        unwatchedHTML += `
            <div>
                ${renderMovieCard(movie)}

                <button
                    onclick="markWatched(${movie.id})"
                    class="bg-green-600 px-3 py-2 rounded mt-2"
                >
                    Mark Watched
                </button>

                <button
                    onclick="removeMovie(${movie.id})"
                    class="bg-red-600 px-3 py-2 rounded mt-2"
                >
                    Remove
                </button>
            </div>
        `;
    }

    // Display watched movies
    for (let i = 0; i < watchedMovies.length; i++) {

        const movie = watchedMovies[i];

        watchedHTML += `
            <div>
                ${renderMovieCard(movie)}

                <button
                    onclick="markWatched(${movie.id})"
                    class="bg-yellow-600 px-3 py-2 rounded mt-2"
                >
                    Mark Unwatched
                </button>

                <button
                    onclick="removeMovie(${movie.id})"
                    class="bg-red-600 px-3 py-2 rounded mt-2"
                >
                    Remove
                </button>
            </div>
        `;
    }

    app.innerHTML = `
        <main class="p-5">

            <a href="../index.html" class="text-red-500">
                ← Back to Home
            </a>

            <h1 class="text-3xl font-bold my-6">
                My Watchlist
            </h1>

            <section class="mb-10">

                <h2 class="text-2xl font-bold mb-5">
                    Unwatched Movies (${unwatchedMovies.length})
                </h2>

                <div class="flex flex-wrap gap-5">
                    ${unwatchedHTML || '<p class="text-gray-400">No unwatched movies.</p>'}
                </div>

            </section>

            <section>

                <h2 class="text-2xl font-bold mb-5">
                    Watched Movies (${watchedMovies.length})
                </h2>

                <div class="flex flex-wrap gap-5">
                    ${watchedHTML || '<p class="text-gray-400">No watched movies.</p>'}
                </div>

            </section>

        </main>
    `;
}

// Mark watched or unwatched
window.markWatched = function (id) {
    toggleWatched(id);
    renderWatchlist();
};

// Remove movie
window.removeMovie = function (id) {
    removeFromWatchlist(id);
    renderWatchlist();
};

renderWatchlist();
