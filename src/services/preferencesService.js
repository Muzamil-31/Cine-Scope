const STORAGE_KEY = "cinescope_preferences";

const DEFAULT_PREFERENCES = {
    preferredGenres: [],
    recentlyViewed: [],
    theme: "dark"
};

// Get preferences safely
function getPreferences() {
    try {
        const storedData = localStorage.getItem(STORAGE_KEY);

        if (!storedData) {
            return { ...DEFAULT_PREFERENCES };
        }

        const preferences = JSON.parse(storedData);

        if (
            !preferences ||
            typeof preferences !== "object" ||
            Array.isArray(preferences)
        ) {
            return { ...DEFAULT_PREFERENCES };
        }

        return {
            preferredGenres: Array.isArray(preferences.preferredGenres)
                ? preferences.preferredGenres
                : [],

            recentlyViewed: Array.isArray(preferences.recentlyViewed)
                ? preferences.recentlyViewed
                : [],

            theme: ["dark", "light"].includes(preferences.theme)
                ? preferences.theme
                : "dark"
        };

    } catch (error) {
        console.error("Failed to read preferences:", error);
        return { ...DEFAULT_PREFERENCES };
    }
}

// Save preferences safely
function savePreferences(preferences) {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(preferences)
        );

        return true;

    } catch (error) {
        console.error("Failed to save preferences:", error);
        return false;
    }
}

// Save preferred genres
export function savePreferredGenres(genres) {
    if (!Array.isArray(genres)) return false;

    const preferences = getPreferences();

    preferences.preferredGenres = genres;

    return savePreferences(preferences);
}

// Get preferred genres
export function getPreferredGenres() {
    return getPreferences().preferredGenres;
}

// Save recently viewed movies
export function addRecentlyViewed(movie) {
    if (!movie || movie.id === undefined) return false;

    const preferences = getPreferences();

    preferences.recentlyViewed = preferences.recentlyViewed.filter(
        item => String(item.id) !== String(movie.id)
    );

    preferences.recentlyViewed.unshift(movie);

    preferences.recentlyViewed = preferences.recentlyViewed.slice(0, 5);

    return savePreferences(preferences);
}

// Get recently viewed movies
export function getRecentlyViewed() {
    return getPreferences().recentlyViewed;
}

// Save theme preference
export function saveTheme(theme) {
    if (!["dark", "light"].includes(theme)) return false;

    const preferences = getPreferences();

    preferences.theme = theme;

    return savePreferences(preferences);
}

// Get saved theme
export function getTheme() {
    return getPreferences().theme;
}

 // Toggle between dark and light themes
export function toggleTheme() {
    const newTheme = getTheme() === "dark" ? "light" : "dark";

    saveTheme(newTheme);

    document.documentElement.classList.toggle(
        "dark",
        newTheme === "dark"
    );

    return newTheme;
}

export function initializeTheme() {
    const theme = getTheme();

    document.documentElement.classList.toggle(
        "dark",
        theme === "dark"
    );

    return theme;
}
