
import { renderNavbar } from "./components/navbar.js";

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
import { addToWatchlist } from "./storage/storageService.js";

import {
    trendingMovies,
    popularMovies,
    topRatedMovies,
    upcomingMovies
} from "./data/movies.js";

const app = document.getElementById("app");

const allMovies = [
    ...trendingMovies,
    ...popularMovies,
    ...topRatedMovies,
    ...upcomingMovies
];

function renderApp() {
    app.innerHTML = `
    ${renderNavbar()}

    <main>
        <div id="homeContent">
            ${renderMovieBanner()}
        </div>

        ${renderSearchBar()}

        <div id="searchResults"></div>

        <div id="homeSections">
            ${renderMovieSection("Trending Movies", trendingMovies)}
            ${renderMovieSection("Popular Movies", popularMovies)}
            ${renderMovieSection("Top Rated Movies", topRatedMovies)}
            ${renderMovieSection("Upcoming Movies", upcomingMovies)}
        </div>
    </main>

    ${renderFooter()}
`;

    initializeMovieBanner();
    initializeSearchFilters(allMovies);
    initializeMovieSections();
    initializeMovieCards();
}

renderApp();
