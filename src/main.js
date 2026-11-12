
import { renderNavbar, initializeNavbar } from "./components/navbar.js";

import {
    renderMovieBanner,
    initializeMovieBanner
} from "./components/movieBanner.js";

import { getState, setState } from "./state/appState.js";

import {
    renderMovieSection,
    initializeMovieSections
} from "./components/movieSection.js";

import { renderSearchBar } from "./components/searchBar.js";
import { initializeSearchFilters } from "./components/searchResults.js";
import { initializeMovieCards } from "./components/movieCard.js";

import { renderFooter } from "./components/footer.js";

import {
    getTrendingMovies,
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    getMovieGenres,
    getMovieRuntime
} from "./services/movieApi.js";

const app = document.getElementById("app");

async function renderApp() {
    try {

        // Fetch movies and genres from TMDB
        const [
            trendingMovies,
            popularMovies,
            topRatedMovies,
            upcomingMovies,
            genres
        ] = await Promise.all([
            getTrendingMovies(),
            getPopularMovies(),
            getTopRatedMovies(),
            getUpcomingMovies(),
            getMovieGenres()
        ]);

        // Get banner movies with runtime
        const bannerMovies = await Promise.all(
            trendingMovies.slice(0, 5).map(async movie => {
                try {
                    return {
                        ...movie,
                        runtime: await getMovieRuntime(movie.id)
                    };
                } catch (error) {
                    console.error(
                        `Failed to load runtime for ${movie.title}:`,
                        error
                    );

                    return { ...movie, runtime: null };
                }
            })
        );

        // Combine all movies and remove duplicates
        const allMovies = [
            ...new Map([
                ...trendingMovies,
                ...popularMovies,
                ...topRatedMovies,
                ...upcomingMovies
            ].map(movie => [movie.id, movie])).values()
        ];

        // Save homepage data in shared state
        setState({
            trendingMovies,
            popularMovies,
            topRatedMovies,
            upcomingMovies,
            bannerMovies,
            allMovies,
            genres
        });

        // Render homepage
        app.innerHTML = `
            <div class="w-full min-h-screen overflow-x-hidden">

                ${renderNavbar()}

                <main class="w-full">

                    <div id="homeContent" class="w-full">
                        ${renderMovieBanner(bannerMovies, genres)}
                    </div>

                    <div class="w-full px-3 sm:px-5 md:px-8">
                        ${renderSearchBar(genres, allMovies)}
                    </div>

                    <div id="searchResults" class="w-full px-3 sm:px-5 md:px-8"></div>

                    <div id="homeSections" class="w-full">
                        ${renderMovieSection("Trending Movies", trendingMovies)}
                        ${renderMovieSection("Popular Movies", popularMovies)}
                        ${renderMovieSection("Top Rated Movies", topRatedMovies)}
                        ${renderMovieSection("Upcoming Movies", upcomingMovies)}
                    </div>

                </main>

                ${renderFooter()}

            </div>
        `;

        // Initialize event listeners
        initializeNavbar();
        initializeMovieBanner();
        initializeSearchFilters(getState().allMovies);
        initializeMovieSections();
        initializeMovieCards(getState().allMovies);

    } catch (error) {

        console.error("Home Page Error:", error);

        app.innerHTML = `
            <div class="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
                <h2 class="text-2xl font-bold mb-3">
                    Unable to load movies
                </h2>

                <p class="text-gray-400">
                    Please check your internet connection or try again.
                </p>

                <button
                    id="retryButton"
                    type="button"
                    class="mt-5 bg-red-600 px-5 py-2 rounded-lg"
                >
                    Retry
                </button>
            </div>
        `;

        document
            .getElementById("retryButton")
            ?.addEventListener("click", renderApp);
    }
}

renderApp();
