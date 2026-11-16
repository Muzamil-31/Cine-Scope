
import { getMoviesByTitle } from "../services/movieApi.js";
import { getMovieDetails } from "../services/movieDetailsService.js";
import { initializeTheme } from "../services/preferencesService.js";
import {
    IMAGE_URL,
    NO_POSTER_URL, 
} from "../config/imageConfig.js";
import {
    initializeThemeToggle,
    renderPageHeader
} from "../components/themeToggle.js";

const app = document.getElementById("app");

initializeTheme();

let selectedMovies = [null, null];
let searchTimers = [null, null];
let searchControllers = [null, null];

// const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
// const NO_POSTER_URL = "https://placehold.co/500x750?text=No+Poster";

// Render comparison page
function renderPage() {
    app.innerHTML = `
        ${renderPageHeader()}

        <main class="bg-white dark:bg-gray-950 text-gray-900 dark:text-white min-h-screen">

            <div class="max-w-6xl mx-auto px-5 py-10">

                <h1 class="text-3xl font-bold text-center mt-6 mb-3">
                    Movie Comparison
                </h1>

                <p class="text-gray-600 dark:text-gray-400 text-center mb-10">
                    Select two movies and compare their details.
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${renderMovieSelector(0)}
                    ${renderMovieSelector(1)}
                </div>

                <div id="comparisonResult" class="mt-10"></div>

            </div>
        </main>
    `;

    initializeThemeToggle();
    initializeSearch();

    app.addEventListener("click", handleMovieSelection);
}

// Render movie selector
function renderMovieSelector(index) {
    return `
        <div class="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-xl">

            <h2 class="text-xl font-semibold mb-4">
                Movie ${index + 1}
            </h2>

            <input
                type="text"
                id="movieSearch${index}"
                placeholder="Search movie title..."
                autocomplete="off"
                class="w-full p-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 outline-none focus:border-red-500"
            >

            <div id="movieResults${index}" class="mt-3 space-y-2 max-h-60 overflow-y-auto"></div>

            <div id="selectedMovie${index}" class="mt-5"></div>

        </div>
    `;
}

// Initialize movie search
function initializeSearch() {
    for (let i = 0; i < 2; i++) {
        const input = document.getElementById(`movieSearch${i}`);

        input.addEventListener("input", () => {
            clearTimeout(searchTimers[i]);
            searchControllers[i]?.abort();

            selectedMovies[i] = null;

            document.getElementById(`selectedMovie${i}`).innerHTML = "";
            document.getElementById("comparisonResult").innerHTML = "";

            const query = input.value.trim();
            const results = document.getElementById(`movieResults${i}`);

            if (!query) {
                results.innerHTML = "";
                return;
            }

            results.innerHTML = `
                <p class="text-gray-500 p-3">Searching...</p>
            `;

            // Wait until the user stops typing
            searchTimers[i] = setTimeout(() => {
                searchMovies(i, query);
            }, 500);
        });
    }
}

// Search movies from TMDB
async function searchMovies(index, query) {
    const results = document.getElementById(`movieResults${index}`);

    const controller = new AbortController();
    searchControllers[index] = controller;

    try {
        const data = await getMoviesByTitle(
            query,
            1,
            controller.signal
        );

        // Ignore outdated results
        if (
            controller.signal.aborted ||
            document.getElementById(`movieSearch${index}`).value.trim() !== query
        ) return;

        const movies = data.results.slice(0, 10);

        results.innerHTML = movies.length
            ? movies.map(movie => `
                <button
                    type="button"
                    data-movie-id="${movie.id}"
                    data-index="${index}"
                    class="w-full text-left p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg">

                    ${movie.title}

                    <span class="text-gray-500 text-sm">
                        (${movie.release_date?.slice(0, 4) || "N/A"})
                    </span>

                </button>
            `).join("")
            : `<p class="text-gray-500 p-3">No movies found.</p>`;

    } catch (error) {
        if (error.name === "AbortError") return;

        console.error("Movie Search Error:", error);

        results.innerHTML = `
            <p class="text-red-400 p-3">Failed to search movies.</p>
        `;
    }
}

// Handle movie selection
async function handleMovieSelection(event) {
    const button = event.target.closest("[data-movie-id]");

    if (!button) return;

    const index = Number(button.dataset.index);
    const movieId = Number(button.dataset.movieId);

    if (selectedMovies[1 - index]?.id === movieId) {
    showToast("Please select two different movies.");
    return;
}

    const movie = await Promise.resolve(
        JSON.parse(JSON.stringify(
            // Find selected movie from displayed search results
            button.dataset.movieId
        ))
    );

    // Get selected movie from the current search results
    const input = document.getElementById(`movieSearch${index}`);
    const query = input.value.trim();

    try {
        const data = await getMoviesByTitle(query, 1);

        const selectedMovie = data.results.find(
            item => item.id === movieId
        );

        if (!selectedMovie) return;

        selectedMovies[index] = selectedMovie;

        document.getElementById(`movieResults${index}`).innerHTML = "";
        input.value = selectedMovie.title;

        document.getElementById(`selectedMovie${index}`).innerHTML = `
            <div class="flex gap-4 items-center">

                <img
                    src="${selectedMovie.poster_path ? IMAGE_URL + selectedMovie.poster_path : NO_POSTER_URL}"
                    alt="${selectedMovie.title}"
                    class="w-20 rounded-lg"
                >

                <div>
                    <h3 class="font-semibold">${selectedMovie.title}</h3>

                    <p class="text-gray-500 text-sm">
                        ${selectedMovie.release_date?.slice(0, 4) || "N/A"}
                    </p>
                </div>

            </div>
        `;

        if (selectedMovies[0] && selectedMovies[1]) {
            compareMovies();
        }

    } catch (error) {
        console.error("Movie Selection Error:", error);
    }
}

// Compare selected movies
async function compareMovies() {
    const result = document.getElementById("comparisonResult");

    const firstId = selectedMovies[0].id;
    const secondId = selectedMovies[1].id;

    result.innerHTML = `
        <p class="text-center text-gray-500">
            Loading comparison...
        </p>
    `;

    try {
        const [first, second] = await Promise.all([
            getMovieDetails(firstId),
            getMovieDetails(secondId)
        ]);

        if (
            selectedMovies[0]?.id !== firstId ||
            selectedMovies[1]?.id !== secondId
        ) return;

        renderComparison(first.details, second.details);

    } catch (error) {
        console.error("Comparison Error:", error);

        result.innerHTML = `
            <p class="text-center text-red-400">
                Failed to load movie comparison.
            </p>
        `;
    }
}
// Toast notification
let toastTimer;

function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";

        toast.className = `
            fixed top-5 left-1/2 -translate-x-1/2 z-50
            bg-gray-900 text-white
            px-5 py-3 rounded-lg shadow-lg
            min-w-[280px]
            transition-opacity duration-300
        `;

        document.body.appendChild(toast);
    }

    toast.innerHTML = `
        <div class="flex items-center gap-2 font-semibold">
            <i class="fa-solid fa-circle-xmark text-red-500"></i>
            Invalid Selection
        </div>

        <p class="text-xs text-gray-300 mt-1 ml-6">
            ${message}
        </p>
    `;

    toast.classList.remove("opacity-0");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.add("opacity-0");

        setTimeout(() => toast.remove(), 300);
    }, 2500);
}
// Render comparison table
function renderComparison(movie1, movie2) {
    const getYear = movie => movie.release_date?.slice(0, 4) || "N/A";
    const getRuntime = movie => movie.runtime ? `${movie.runtime} min` : "N/A";
    const getGenres = movie => movie.genres?.map(g => g.name).join(", ") || "N/A";

    const rows = [
        ["Rating", movie1.vote_average?.toFixed(1) ?? "N/A", movie2.vote_average?.toFixed(1) ?? "N/A"],
        ["Release Year", getYear(movie1), getYear(movie2)],
        ["Runtime", getRuntime(movie1), getRuntime(movie2)],
        ["Popularity", movie1.popularity?.toFixed(1) ?? "N/A", movie2.popularity?.toFixed(1) ?? "N/A"],
        ["Genres", getGenres(movie1), getGenres(movie2)],
        ["Vote Count", movie1.vote_count ?? "N/A", movie2.vote_count ?? "N/A"]
    ];

    document.getElementById("comparisonResult").innerHTML = `
        <h2 class="text-2xl font-bold mb-5 text-center">
            Comparison Results
        </h2>

        <div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">

            <table class="w-full text-left">

                <thead class="bg-gray-100 dark:bg-gray-900">
                    <tr>
                        <th class="p-4">Details</th>
                        <th class="p-4">${movie1.title}</th>
                        <th class="p-4">${movie2.title}</th>
                    </tr>
                </thead>

                <tbody>
                    ${rows.map(row => `
                        <tr class="border-t border-gray-200 dark:border-gray-800">
                            <td class="p-4 font-semibold">${row[0]}</td>
                            <td class="p-4 text-gray-700 dark:text-gray-300">${row[1]}</td>
                            <td class="p-4 text-gray-700 dark:text-gray-300">${row[2]}</td>
                        </tr>
                    `).join("")}
                </tbody>

            </table>

        </div>
    `;
}

// Initialize page
renderPage();
