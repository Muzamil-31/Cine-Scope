
import { addToWatchlist } from "../storage/storageService.js";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export function renderMovieCard(movie, isCarousel = false) {

    const year = movie.release_date
        ? movie.release_date.split("-")[0]
        : "N/A";

    const posterUrl = movie.poster_path
        ? IMAGE_URL + movie.poster_path
        : "https://placehold.co/500x750?text=No+Poster";

    const layoutClass = isCarousel
        ? "min-w-[160px] md:min-w-[200px] shrink-0"
        : "w-full min-w-0";

    return `
        <article
            class="relative ${layoutClass} bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden group shadow-sm dark:shadow-none"
        >

            <a
                href="details.html?id=${movie.id}"
                class="block"
                aria-label="View details for ${movie.title}"
            >

                <img
                    src="${posterUrl}"
                    alt="${movie.title}"
                    loading="lazy"
                    class="w-full h-[230px] md:h-[280px] object-cover group-hover:scale-105 transition-transform duration-300"
                >

                <div class="p-3">

                    <h3 class="font-semibold truncate">
                        ${movie.title}
                    </h3>

                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Movie
                    </p>

                    <div class="flex justify-between items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>${year}</span>
                        <span>⭐ ${movie.vote_average?.toFixed(1) || "N/A"}</span>
                    </div>

                </div>

            </a>

            <button
                type="button"
                class="watchlistBtn absolute top-2 right-2 bg-black/70 hover:bg-red-600 text-white w-9 h-9 rounded-full flex items-center justify-center"
                data-watchlist-id="${movie.id}"
                aria-label="Add ${movie.title} to Watchlist"
                title="Add to Watchlist"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                >
                    <path d="M12 5v14M5 12h14" />
                </svg>
            </button>

        </article>
    `;
}

export function initializeMovieCards(movies) {

    document.addEventListener("click", function (event) {

        const watchlistButton = event.target.closest(".watchlistBtn");

        if (!watchlistButton) return;

        event.preventDefault();

        const movieId = watchlistButton.dataset.watchlistId;

        const movie = movies.find(
            item => String(item.id) === movieId
        );

        if (!movie) return;

        const result = addToWatchlist(movie);

        if (result === "added") {
            alert("Movie added to Watchlist!");
        } else if (result === "duplicate") {
            alert("Movie is already in your Watchlist.");
        } else {
            alert("Could not save the movie to your Watchlist.");
        }
    });
}
