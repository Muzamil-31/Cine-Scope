
 // Get watchlist
export function getWatchlist() {
    return JSON.parse(localStorage.getItem("cinescope_watchlist")) || [];
}

// Add movie to watchlist
export function addToWatchlist(movie) {
    let watchlist = getWatchlist();

    // Prevent duplicates
    const exists = watchlist.some(item => item.id === movie.id);

    if (exists) {
        return false;
    }

    watchlist.push({
        ...movie,
        watched: false
    });

    localStorage.setItem("cinescope_watchlist", JSON.stringify(watchlist));

    return true;
}

// Remove movie from watchlist
export function removeFromWatchlist(movieId) {
    let watchlist = getWatchlist();

    watchlist = watchlist.filter(movie => movie.id !== movieId);

    localStorage.setItem("cinescope_watchlist", JSON.stringify(watchlist));
}

// Mark movie as watched or unwatched
export function toggleWatched(movieId) {
    let watchlist = getWatchlist();

    for (let i = 0; i < watchlist.length; i++) {
        if (watchlist[i].id === movieId) {
            watchlist[i].watched = !watchlist[i].watched;
        }
    }

    localStorage.setItem("cinescope_watchlist", JSON.stringify(watchlist));
}
