import { renderMovieCard } from "./movieCard.js";

export function renderMovieGrid(movies = []) {

    if (!movies.length) {
        return `
            <p class="text-gray-400 text-center py-10">
                No movies available.
            </p>
        `;
    }

    return `
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 p-5">
            ${movies.map(movie => renderMovieCard(movie)).join("")}
        </div>
    `;
}
