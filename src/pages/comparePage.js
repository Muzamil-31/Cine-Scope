
import {
    getPopularMovies,
    getTrendingMovies
} from "../services/movieApi.js";

import { getMovieDetails } from "../services/movieDetailsService.js";

const app = document.getElementById("app");

let movies = [];
let selectedMovies = [null, null];

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

// Render the comparison page
function renderPage() {
    app.innerHTML = `
        <div class="max-w-6xl mx-auto px-5 py-10">

            <a href="index.html"
                class="text-gray-400 hover:text-white">
                ← Back to Home
            </a>

            <h1 class="text-3xl font-bold text-center mt-6 mb-3">
                Movie Comparison
            </h1>

            <p class="text-gray-400 text-center mb-10">
                Select two movies and compare their details.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                ${renderMovieSelector(0)}
                ${renderMovieSelector(1)}

            </div>

            <div id="comparisonResult" class="mt-10"></div>

        </div>
    `;

    initializeSearch();
}

// Render one movie selector
function renderMovieSelector(index) {
    return `
        <div class="bg-gray-900 p-5 rounded-xl">

            <h2 class="text-xl font-semibold mb-4">
                Movie ${index + 1}
            </h2>

            <input
                type="text"
                id="movieSearch${index}"
                placeholder="Search movie title..."
                class="w-full p-3 rounded-lg bg-gray-800 outline-none"
                autocomplete="off"
            >

            <div
                id="movieResults${index}"
                class="mt-3 space-y-2 max-h-60 overflow-y-auto">
            </div>

            <div id="selectedMovie${index}" class="mt-5"></div>

        </div>
    `;
}

// Search movies in the loaded movie list
function initializeSearch() {
    for (let i = 0; i < 2; i++) {
        const input = document.getElementById(`movieSearch${i}`);

        input.addEventListener("input", () => {
            const searchText = input.value.toLowerCase().trim();
            const results = document.getElementById(`movieResults${i}`);

            if (!searchText) {
                results.innerHTML = "";
                return;
            }

            const filteredMovies = movies
                .filter(movie =>
                    movie.title.toLowerCase().includes(searchText)
                )
                .slice(0, 10);

            results.innerHTML = filteredMovies.length
                ? filteredMovies.map(movie => `
                    <button
                        type="button"
                        data-movie-id="${movie.id}"
                        data-index="${i}"
                        class="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg">
                        ${movie.title}
                        <span class="text-gray-400 text-sm">
                            (${movie.release_date?.slice(0, 4) || "N/A"})
                        </span>
                    </button>
                `).join("")
                : `<p class="text-gray-400 p-3">No movies found.</p>`;
        });
    }

    app.addEventListener("click", handleMovieSelection);
}

// Handle movie selection
async function handleMovieSelection(event) {
    const button = event.target.closest("[data-movie-id]");

    if (!button) return;

    const movieId = Number(button.dataset.movieId);
    const index = Number(button.dataset.index);

    const otherMovie = selectedMovies[1 - index];

    if (otherMovie?.id === movieId) {
        alert("Please select two different movies.");
        return;
    }

    const movie = movies.find(item => item.id === movieId);

    if (!movie) return;

    selectedMovies[index] = movie;

    document.getElementById(`movieResults${index}`).innerHTML = "";

    document.getElementById(`movieSearch${index}`).value = movie.title;

    document.getElementById(`selectedMovie${index}`).innerHTML = `
        <div class="flex gap-4 items-center">
            <img
                src="${movie.poster_path ? IMAGE_URL + movie.poster_path : ""}"
                alt="${movie.title}"
                class="w-20 rounded-lg"
            >
            <div>
                <h3 class="font-semibold">${movie.title}</h3>
                <p class="text-gray-400 text-sm">
                    ${movie.release_date?.slice(0, 4) || "N/A"}
                </p>
            </div>
        </div>
    `;

    if (selectedMovies[0] && selectedMovies[1]) {
        await compareMovies();
    }
}

// Fetch complete details and compare
async function compareMovies() {
    const result = document.getElementById("comparisonResult");

    result.innerHTML = `
        <p class="text-center text-gray-400">Loading comparison...</p>
    `;

    try {
        const [first, second] = await Promise.all([
            getMovieDetails(selectedMovies[0].id),
            getMovieDetails(selectedMovies[1].id)
        ]);

        renderComparison(first.details, second.details);

    } catch (error) {
        console.error("Comparison Error:", error);

        result.innerHTML = `
            <p class="text-center text-red-400">
                Failed to load movie comparison. Please try again.
            </p>
        `;
    }
}

// Display comparison table
function renderComparison(movie1, movie2) {
    const getYear = movie =>
        movie.release_date?.slice(0, 4) || "N/A";

    const getRuntime = movie =>
        movie.runtime ? `${movie.runtime} min` : "N/A";

    const getGenres = movie =>
        movie.genres?.map(genre => genre.name).join(", ") || "N/A";

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

        <div class="overflow-x-auto rounded-xl border border-gray-800">

            <table class="w-full text-left">

                <thead class="bg-gray-900">
                    <tr>
                        <th class="p-4">Details</th>
                        <th class="p-4">${movie1.title}</th>
                        <th class="p-4">${movie2.title}</th>
                    </tr>
                </thead>

                <tbody>
                    ${rows.map(row => `
                        <tr class="border-t border-gray-800">
                            <td class="p-4 font-semibold">${row[0]}</td>
                            <td class="p-4 text-gray-300">${row[1]}</td>
                            <td class="p-4 text-gray-300">${row[2]}</td>
                        </tr>
                    `).join("")}
                </tbody>

            </table>

        </div>
    `;
}

// Load movies from TMDB
async function initializeComparison() {
    try {
        app.innerHTML = `
            <p class="text-center text-gray-400 p-10">
                Loading movies...
            </p>
        `;

        const [popular, trending] = await Promise.all([
            getPopularMovies(),
            getTrendingMovies()
        ]);

        movies = [
            ...new Map(
                [...popular, ...trending].map(movie => [movie.id, movie])
            ).values()
        ];

        renderPage();

    } catch (error) {
        console.error("Movie Loading Error:", error);

        app.innerHTML = `
            <p class="text-center text-red-400 p-10">
                Failed to load movies. Please refresh the page.
            </p>
        `;
    }
}

initializeComparison();
