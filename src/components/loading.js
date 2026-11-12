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

// Get the selected filters
function getSelectedFilters() {
    return {
        genre: document.getElementById("genreFilter")?.value || "",
        year: document.getElementById("yearFilter")?.value || "",
        rating: document.getElementById("ratingFilter")?.value || "",
        sort: document.getElementById("sortFilter")?.value || ""
    };
}

// Apply genre, year, rating and sorting
function filterMovies(movies) {
    const filters = getSelectedFilters();

    let filteredMovies = movies.filter(movie => {
        if (
            filters.genre &&
            !movie.genre_ids?.includes(Number(filters.genre))
        ) return false;

        const movieYear = movie.release_date?.split("-")[0] || "";

        if (filters.year && movieYear !== filters.year) {
            return false;
        }

        if (
            filters.rating &&
            (movie.vote_average || 0) < Number(filters.rating)
        ) return false;

        return true;
    });

    if (filters.sort === "rating") {
        filteredMovies.sort(
            (a, b) => b.vote_average - a.vote_average
        );
    }

    if (filters.sort === "popularity") {
        filteredMovies.sort(
            (a, b) => b.popularity - a.popularity
        );
    }

    if (filters.sort === "year") {
        filteredMovies.sort(
            (a, b) =>
                new Date(b.release_date || 0) -
                new Date(a.release_date || 0)
        );
    }

    return filteredMovies;
}

// Render movie results
function renderResults(movies, showLoadMore = false) {
    const resultsContainer = document.getElementById("searchResults");

    if (!resultsContainer) return;

    if (movies.length === 0) {
        resultsContainer.innerHTML = `
            <p class="text-gray-400 text-center py-10">
                No movies found. Try another search.
            </p>

            ${showLoadMore ? `
                <div class="text-center py-6">
                    <button
                        id="loadMoreMovies"
                        class="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg">
                        Load More
                    </button>
                </div>
            ` : ""}
        `;
        return;
    }

    resultsContainer.innerHTML = `
        ${renderMovieGrid(movies)}

        ${showLoadMore ? `
            <div class="text-center py-6">
                <button
                    id="loadMoreMovies"
                    class="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg">
                    Load More
                </button>
            </div>
        ` : ""}
    `;
}

// Show or hide homepage sections
function toggleHomeSections(isSearching) {
    const homeContent = document.getElementById("homeContent");
    const homeSections = document.getElementById("homeSections");

    if (homeContent) {
        homeContent.style.display = isSearching ? "none" : "block";
    }

    if (homeSections) {
        homeSections.style.display = isSearching ? "none" : "block";
    }
}

// Search movies using TMDB
async function fetchSearchResults(query, page = 1) {
    const resultsContainer = document.getElementById("searchResults");

    if (!resultsContainer) return;

    if (searchController) {
        searchController.abort();
    }

    const controller = new AbortController();
    searchController = controller;

    if (page === 1) {
        apiMovies = [];
        currentPage = 1;

        resultsContainer.innerHTML = `
            <p class="text-gray-400 text-center py-10">
                Searching movies...
            </p>
        `;
    } else {
        const loadMoreButton = document.getElementById("loadMoreMovies");

        if (loadMoreButton) {
            loadMoreButton.disabled = true;
            loadMoreButton.textContent = "Loading...";
        }
    }

    try {
        const data = await getMoviesByTitle(
            query,
            page,
            controller.signal
        );

        // Ignore outdated requests
        if (searchController !== controller) return;

        if (
            !data ||
            !Array.isArray(data.results) ||
            typeof data.page !== "number" ||
            typeof data.total_pages !== "number"
        ) {
            throw new Error("Invalid movie search response");
        }

        currentPage = data.page;
        totalPages = Math.min(data.total_pages, 500);

        apiMovies = page === 1
            ? data.results
            : [...apiMovies, ...data.results];

        // Update shared application state
        setState({
            searchQuery: query,
            searchMovies: apiMovies,
            searchPage: currentPage,
            searchTotalPages: totalPages
        });

        const filteredMovies = filterMovies(apiMovies);

        renderResults(
            filteredMovies,
            currentPage < totalPages
        );

    } catch (error) {
        if (error.name === "AbortError") return;

        console.error("Movie Search Error:", error);

        if (searchController !== controller) return;

        resultsContainer.innerHTML = `
            <p class="text-red-400 text-center py-10">
                Something went wrong. Please try again.
            </p>
        `;
    }
}

// Debounce API search by 500 milliseconds
const fetchSearchResultsDebounced = debounce(query => {
    fetchSearchResults(query, 1);
}, 500);

// Handle search input
function handleTitleSearch(query) {
    // Cancel any pending debounced search
    fetchSearchResultsDebounced.cancel();

    // Cancel the previous API request
    if (searchController) {
        searchController.abort();
        searchController = null;
    }

    // Update the global search query
    currentQuery = query.trim();

    currentPage = 1;
    totalPages = 1;
    apiMovies = [];

    setState({
        searchQuery: currentQuery,
        searchMovies: [],
        searchPage: 1,
        searchTotalPages: 1
    });

    toggleHomeSections(Boolean(currentQuery));

    // If search is empty, show local homepage movies
    if (!currentQuery) {
        searchMovies(localMovies);
        return;
    }

    const resultsContainer = document.getElementById("searchResults");

    if (resultsContainer) {
        resultsContainer.innerHTML = `
            <p class="text-gray-400 text-center py-10">
                Searching movies...
            </p>
        `;
    }

    fetchSearchResultsDebounced(currentQuery);
}

// Local filtering function
export function searchMovies(movies) {
    const desktopSearch = document.getElementById("movieSearch");
    const mobileSearch = document.getElementById("mobileMovieSearch");

    const searchText = (
        desktopSearch?.value || mobileSearch?.value || ""
    ).trim();

    // Apply filters to API search results
    if (searchText && currentQuery) {
        if (apiMovies.length > 0) {
            renderResults(
                filterMovies(apiMovies),
                currentPage < totalPages
            );
        }

        return;
    }

    const filters = getSelectedFilters();

    const isFiltering =
        filters.genre ||
        filters.year ||
        filters.rating ||
        filters.sort;

    toggleHomeSections(Boolean(isFiltering));

    const resultsContainer = document.getElementById("searchResults");

    if (!isFiltering) {
        if (resultsContainer) {
            resultsContainer.innerHTML = "";
        }
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

    // Filter change events
    filters.forEach(filter => {
        filter.addEventListener("change", () => {
            if (currentQuery) {
                searchMovies(apiMovies);
            } else {
                searchMovies(localMovies);
            }
        });
    });

    // Synchronize desktop and mobile search inputs
    function handleSearchInput(event) {
        if (event.target === desktopSearch && mobileSearch) {
            mobileSearch.value = desktopSearch.value;
        }

        if (event.target === mobileSearch && desktopSearch) {
            desktopSearch.value = mobileSearch.value;
        }

        handleTitleSearch(event.target.value);
    }

    desktopSearch?.addEventListener("input", handleSearchInput);
    mobileSearch?.addEventListener("input", handleSearchInput);

    // Load the next API page
    document.getElementById("searchResults")?.addEventListener(
        "click",
        event => {
            const button = event.target.closest("#loadMoreMovies");

            if (!button) return;

            if (currentPage < totalPages && currentQuery) {
                fetchSearchResults(currentQuery, currentPage + 1);
            }
        }
    );
}
