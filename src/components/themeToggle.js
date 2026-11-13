import { getTheme, toggleTheme } from "../services/preferencesService.js";

export function renderThemeToggle() {
    const text = getTheme() === "dark" ? "Light Mode" : "Dark Mode";

    return `
        <button
            type="button"
            data-theme-toggle
            class="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded-lg text-sm"
        >
            ${text}
        </button>
    `;
}

export function renderPageHeader() {
    return `
        <header class="sticky top-0 z-50 flex items-center justify-between gap-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 md:px-8 py-4">
            <a href="index.html" class="text-lg md:text-2xl font-bold text-red-500 shrink-0">
                CineScope
            </a>

            <nav class="hidden sm:flex items-center gap-2 md:gap-6 text-sm md:text-base">
                <a href="index.html" class="hover:text-red-500 transition">Home</a>
                <a href="watchlist.html" class="hover:text-red-500 transition">Watchlist</a>
                <a href="compare.html" class="hover:text-red-500 transition">Compare</a>
            </nav>

            ${renderThemeToggle()}
        </header>
    `;
}

export function initializeThemeToggle() {
    const buttons = document.querySelectorAll("[data-theme-toggle]");

    function updateButtons(theme) {
        const text = theme === "dark" ? "Light Mode" : "Dark Mode";
        buttons.forEach(button => {
            button.textContent = text;
        });
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            updateButtons(toggleTheme());
        });
    });

    updateButtons(getTheme());
}
