import { renderMovieGrid } from "./movieGrid.js";
import { getMoviesByTitle } from "../services/movieApi.js";
import { setState } from "../state/appState.js";
import { debounce } from "../utils/debounce.js";

let searchController = null;

let currentQuery = "";
let currentPage = 1;
let totalPages = 1;

let apiMovies = [];
let localMovies = [];


// Get selected filters
function getSelectedFilters() {
    return {
        genre: document.getElementById("genreFilter")?.value || "",
        year: document.getElementById("yearFilter")?.value || "",
        rating: document.getElementById("ratingFilter")?.value || "",
        sort: document.getElementById("sortFilter")?.value || ""
    };
}


// Filter and sort movies
function filterMovies(movies) {
    const filters = getSelectedFilters();

    let results = movies.filter(movie => {
        if (
            filters.genre &&
            !movie.genre_ids?.includes(Number(filters.genre))
        ) return false;

        const year = movie.release_date?.split("-")[0] || "";

        if (filters.year && year !== filters.year) return false;

        if (
            filters.rating &&
            movie.vote_average < Number(filters.rating)
        ) return false;

        return true;
    });

    if (filters.sort === "rating") {
        results.sort((a, b) => b.vote_average - a.vote_average);
    }

    if (filters.sort === "popularity") {
        results.sort((a, b) => b.popularity - a.popularity);
    }

    if (filters.sort === "year") {
        results.sort(
            (a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0)
        );
    }

    return results;
}


// Display movie results
function renderResults(movies, showLoadMore = false) {
    const container = document.getElementById("searchResults");

    if (!container) return;

    container.innerHTML = `
        ${movies.length
            ? renderMovieGrid(movies)
            : `<p class="text-gray-400 text-center py-10">
                    No movies found. Try another search.
               </p>`
        }

        ${showLoadMore ? `
            <div class="text-center py-6">
                <button id="loadMoreMovies"
                    class="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg">
                    Load More
                </button>
            </div>
        ` : ""}
    `;
}


// Show or hide homepage sections
function toggleHomeSections(isSearching) {
    ["homeContent", "homeSections"].forEach(id => {
        const element = document.getElementById(id);

        if (element) {
            element.style.display = isSearching ? "none" : "block";
        }
    });
}


// Fetch movies from TMDB
async function fetchSearchResults(query, page = 1) {
    searchController?.abort();

    const controller = new AbortController();
    searchController = controller;

    const container = document.getElementById("searchResults");

    if (!container) return;

    if (page === 1) {
        apiMovies = [];

        container.innerHTML = `
            <p class="text-gray-400 text-center py-10">
                Searching movies...
            </p>
        `;
    } else {
        const button = document.getElementById("loadMoreMovies");

        if (button) {
            button.disabled = true;
            button.textContent = "Loading...";
        }
    }

    try {
        const data = await getMoviesByTitle(query, page, controller.signal);

        if (searchController !== controller) return;

        currentPage = data.page;
        totalPages = Math.min(data.total_pages, 500);

        apiMovies = page === 1
            ? data.results
            : [...apiMovies, ...data.results];

        setState({
            searchQuery: query,
            searchMovies: apiMovies,
            searchPage: currentPage,
            searchTotalPages: totalPages
        });

        renderResults(
            filterMovies(apiMovies),
            currentPage < totalPages
        );

    } catch (error) {
        if (error.name === "AbortError") return;

        if (searchController !== controller) return;

        console.error("Movie Search Error:", error);

        container.innerHTML = `
            <p class="text-red-400 text-center py-10">
                Something went wrong. Please try again.
            </p>
        `;
    }
}


// Debounce API search
const fetchSearchResultsDebounced = debounce(query => {
    fetchSearchResults(query, 1);
}, 500);


// Handle search input
function handleTitleSearch(query) {
    fetchSearchResultsDebounced.cancel();

    searchController?.abort();
    searchController = null;

    currentQuery = query.trim();
    currentPage = 1;
    apiMovies = [];

    setState({
        searchQuery: currentQuery,
        searchMovies: [],
        searchPage: 1,
        searchTotalPages: 1
    });

    toggleHomeSections(Boolean(currentQuery));

    if (!currentQuery) {
        searchMovies(localMovies);
        return;
    }

    const container = document.getElementById("searchResults");

    if (container) {
        container.innerHTML = `
            <p class="text-gray-400 text-center py-10">
                Searching movies...
            </p>
        `;
    }

    fetchSearchResultsDebounced(currentQuery);
}


// Apply local filters or search filters
export function searchMovies(movies) {
    const results = document.getElementById("searchResults");

    if (currentQuery) {
        renderResults(
            filterMovies(apiMovies),
            currentPage < totalPages
        );
        return;
    }

    const filters = getSelectedFilters();

    const isFiltering = Object.values(filters).some(Boolean);

    toggleHomeSections(isFiltering);

    if (!isFiltering) {
        if (results) results.innerHTML = "";
        return;
    }

    renderResults(filterMovies(movies));
}


// Initialize search and filters
export function initializeSearchFilters(movies) {
    localMovies = movies;

    const desktopSearch = document.getElementById("movieSearch");
    const mobileSearch = document.getElementById("mobileMovieSearch");

    const filters = document.querySelectorAll(
        "#genreFilter, #yearFilter, #ratingFilter, #sortFilter"
    );

    filters.forEach(filter => {
        filter.addEventListener("change", () => {
            searchMovies(currentQuery ? apiMovies : localMovies);
        });
    });

    function handleSearchInput(event) {
        if (desktopSearch) desktopSearch.value = event.target.value;
        if (mobileSearch) mobileSearch.value = event.target.value;

        handleTitleSearch(event.target.value);
    }

    desktopSearch?.addEventListener("input", handleSearchInput);
    mobileSearch?.addEventListener("input", handleSearchInput);

    document.getElementById("searchResults")?.addEventListener("click", event => {
        if (event.target.closest("#loadMoreMovies")) {
            if (currentQuery && currentPage < totalPages) {
                fetchSearchResults(currentQuery, currentPage + 1);
            }
        }
    });
}
