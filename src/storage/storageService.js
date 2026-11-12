const STORAGE_KEY = "cinescope_watchlist";

// Get watchlist safely
export function getWatchlist() {
    try {
        const storedData = localStorage.getItem(STORAGE_KEY);

        if (!storedData) return [];

        const watchlist = JSON.parse(storedData);

        // Validate stored data
        if (!Array.isArray(watchlist)) {
            return [];
        }

        return watchlist.filter(
            movie => movie &&
            typeof movie === "object" &&
            movie.id !== undefined
        );

    } catch (error) {
        console.error("Failed to read watchlist:", error);
        return [];
    }
}

// Save watchlist safely
function saveWatchlist(watchlist) {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(watchlist)
        );

        return true;

    } catch (error) {
        console.error("Failed to save watchlist:", error);
        return false;
    }
}

// Add movie to watchlist
export function addToWatchlist(movie) {

    if (!movie || movie.id === undefined) {
        return "error";
    }

    const watchlist = getWatchlist();

    // Prevent duplicates
    const exists = watchlist.some(
        item => String(item.id) === String(movie.id)
    );

    if (exists) {
        return "duplicate";
    }

    watchlist.push({
        ...movie,
        watched: false
    });

    return saveWatchlist(watchlist) ? "added" : "error";
}

// Remove movie from watchlist
export function removeFromWatchlist(movieId) {

    const watchlist = getWatchlist();

    const updatedWatchlist = watchlist.filter(
        movie => String(movie.id) !== String(movieId)
    );

    return saveWatchlist(updatedWatchlist);
}

// Mark movie as watched or unwatched
export function toggleWatched(movieId) {

    const watchlist = getWatchlist();

    const movie = watchlist.find(
        item => String(item.id) === String(movieId)
    );

    if (!movie) return false;

    movie.watched = !movie.watched;

    return saveWatchlist(watchlist);
}
