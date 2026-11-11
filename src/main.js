
import { renderNavbar, initializeNavbar } from "./components/navbar.js";

import {
    renderMovieBanner,
    initializeMovieBanner
} from "./components/movieBanner.js";

import {
    renderMovieSection,
    initializeMovieSections
} from "./components/movieSection.js";

import { renderSearchBar } from "./components/searchBar.js";
import { initializeSearchFilters } from "./components/searchResults.js";
import { initializeMovieCards } from "./components/movieCard.js";

import { renderFooter } from "./components/footer.js";

import {
    trendingMovies,
    popularMovies,
    topRatedMovies,
    upcomingMovies
} from "./data/movies.js";

const app = document.getElementById("app");

const allMovies = [
    ...new Map([
        ...trendingMovies,
        ...popularMovies,
        ...topRatedMovies,
        ...upcomingMovies
    ].map(movie => [movie.id, movie])).values()
];

function renderApp() {

    app.innerHTML = `
        <div class="w-full min-h-screen overflow-x-hidden">

            ${renderNavbar()}

            <main class="w-full">

                <div id="homeContent" class="w-full">
                    ${renderMovieBanner()}
                </div>

                <div class="w-full px-3 sm:px-5 md:px-8">
                    ${renderSearchBar()}
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
// Initialize navbar first
    initializeNavbar();
    
    initializeMovieBanner();
    initializeSearchFilters(allMovies);
    initializeMovieSections();
    initializeMovieCards();
}

renderApp();
