
const STORAGE_KEY = "cinescope_preferences";

function getPreferences() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
        preferredGenres: [],
        recentlyViewed: [],
        theme: "dark"
    };
}

function savePreferences(preferences) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
}

// Save preferred genres
export function savePreferredGenres(genres) {
    const preferences = getPreferences();

    preferences.preferredGenres = genres;

    savePreferences(preferences);
}

// Get preferred genres
export function getPreferredGenres() {
    return getPreferences().preferredGenres;
}

// Save recently viewed movies
export function addRecentlyViewed(movie) {
    const preferences = getPreferences();

    preferences.recentlyViewed = preferences.recentlyViewed.filter(
        item => item.id !== movie.id
    );

    preferences.recentlyViewed.unshift(movie);

    preferences.recentlyViewed = preferences.recentlyViewed.slice(0, 5);

    savePreferences(preferences);
}

// Get recently viewed movies
export function getRecentlyViewed() {
    return getPreferences().recentlyViewed;
}

// Save theme preference
export function saveTheme(theme) {
    const preferences = getPreferences();

    preferences.theme = theme;

    savePreferences(preferences);
}

// Get saved theme
export function getTheme() {
    return getPreferences().theme;
}
