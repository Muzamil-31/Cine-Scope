
import { renderMovieCard } from "./movieCard.js";

export function searchMovies(movies) {

    const genreFilter = document.getElementById("genreFilter");
    const yearFilter = document.getElementById("yearFilter");
    const ratingFilter = document.getElementById("ratingFilter");
    const sortFilter = document.getElementById("sortFilter");

    const desktopSearch = document.getElementById("movieSearch");
    const mobileSearch = document.getElementById("mobileMovieSearch");

    const searchText = (
        desktopSearch?.value || mobileSearch?.value || ""
    ).toLowerCase().trim();

    const selectedGenre = genreFilter.value;
    const selectedYear = yearFilter.value;
    const selectedRating = ratingFilter.value;

    const homeContent = document.getElementById("homeContent");
    const homeSections = document.getElementById("homeSections");
    const resultsContainer = document.getElementById("searchResults");

    const isSearching =
        searchText !== "" ||
        selectedGenre !== "" ||
        selectedYear !== "" ||
        selectedRating !== "" ||
        sortFilter.value !== "";

    homeContent.style.display = isSearching ? "none" : "block";
    homeSections.style.display = isSearching ? "none" : "block";

    if (!isSearching) {
        resultsContainer.innerHTML = "";
        return;
    }

    let filteredMovies = [];

    for (let i = 0; i < movies.length; i++) {

        const movie = movies[i];

        if (searchText && !movie.title.toLowerCase().includes(searchText)) continue;

        if (selectedGenre !== "" && movie.genre !== selectedGenre) continue;

        if (selectedYear !== "" && movie.year != selectedYear) continue;

        if (selectedRating !== "" && movie.rating < Number(selectedRating)) continue;

        filteredMovies.push(movie);
    }

    if (sortFilter.value === "rating") {
        filteredMovies.sort((a, b) => b.rating - a.rating);
    }

    if (sortFilter.value === "popularity") {
        filteredMovies.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }

    if (sortFilter.value === "year") {
        filteredMovies.sort((a, b) => b.year - a.year);
    }

    if (filteredMovies.length === 0) {
        resultsContainer.innerHTML = `
            <p class="text-gray-400 text-center py-10">
                No movies found.
            </p>
        `;
        return;
    }

    let movieHTML = "";

    for (let i = 0; i < filteredMovies.length; i++) {
        movieHTML += renderMovieCard(filteredMovies[i]);
    }

    resultsContainer.innerHTML = `
        <div class="flex flex-wrap gap-5 p-5">
            ${movieHTML}
        </div>
    `;
}

export function initializeSearchFilters(movies) {

    const filters = document.querySelectorAll(
        "#genreFilter, #yearFilter, #ratingFilter, #sortFilter"
    );

    filters.forEach(filter => {
        filter.addEventListener("change", () => searchMovies(movies));
    });

    const desktopSearch = document.getElementById("movieSearch");
    const mobileSearch = document.getElementById("mobileMovieSearch");

    function handleSearch(event) {

        // Keep both search inputs synchronized
        if (event.target === desktopSearch && mobileSearch) {
            mobileSearch.value = desktopSearch.value;
        }

        if (event.target === mobileSearch && desktopSearch) {
            desktopSearch.value = mobileSearch.value;
        }

        searchMovies(movies);
    }

    if (desktopSearch) {
        desktopSearch.addEventListener("input", handleSearch);
    }

    if (mobileSearch) {
        mobileSearch.addEventListener("input", handleSearch);
    }
}
