
export function renderMovieCard(movie) {
    return `
       <div
    data-movie-id="${movie.id}"
    class="relative min-w-[160px] md:min-w-[200px] shrink-0 bg-gray-900 rounded-lg overflow-hidden group cursor-pointer"
>

            <img
                src="${movie.poster}"
                alt="${movie.title}"
                loading="lazy"
                class="w-full h-[230px] md:h-[280px] object-cover group-hover:scale-105 transition-transform duration-300"
            >

            <div class="p-3">

                <h3 class="font-semibold truncate">
                    ${movie.title}
                </h3>

                <p class="text-sm text-gray-400 mt-1">
    ${movie.genre}
</p>

                <div class="flex justify-between items-center mt-2 text-sm text-gray-400">
                    <span>${movie.year}</span>
                    <span>⭐ ${movie.rating}</span>
                </div>

                <button
    type="button"
    class="watchlistBtn absolute top-2 right-2 bg-black/70 hover:bg-red-600 text-white w-9 h-9 rounded-full flex items-center justify-center"
    data-watchlist-id="${movie.id}"
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

            </div>

        </div>
    `;
}
export function initializeMovieCards() {
    document.addEventListener("click", function (event) {

        const movieCard = event.target.closest("[data-movie-id]");

        if (!movieCard) return;

        // Ignore watchlist button clicks
        if (event.target.closest(".watchlistBtn")) return;

        const movieId = movieCard.dataset.movieId;

        window.location.href = `details.html?id=${movieId}`;
    });
}