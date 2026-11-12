
const state = {

    // Homepage movies
    trendingMovies: [],
    popularMovies: [],
    topRatedMovies: [],
    upcomingMovies: [],
    bannerMovies: [],
    allMovies: [],

    // Movie genres
    genres: [],

    // Search state
    searchQuery: "",
    searchMovies: [],
    searchPage: 1,
    searchTotalPages: 1,

    // Movie comparison
    selectedMovies: [null, null]
};


// Store subscribers
const listeners = new Set();


// Get the current application state
export function getState() {
    return state;
}


// Update application state
export function setState(newState) {

    Object.assign(state, newState);

    // Notify subscribed components
    listeners.forEach(callback => callback(state));

}


// Subscribe to state changes
export function subscribe(callback) {

    listeners.add(callback);

    return function unsubscribe() {
        listeners.delete(callback);
    };

}
