
import { initializeThemeToggle } from "./themeToggle.js";

export function renderNavbar() {
    return `
        <nav class="sticky top-0 z-50 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 md:px-8 py-4">
            <div class="relative flex items-center justify-between gap-3">

                <a href="index.html" class="text-2xl font-bold text-red-500 shrink-0">
                    CineScope
                </a>

                <div class="hidden md:flex items-center gap-8 text-gray-700 dark:text-gray-300">
                    <a href="index.html" class="hover:text-red-500 transition">Home</a>
                    <a href="watchlist.html" class="hover:text-red-500 transition">Watchlist</a>
                    <a href="compare.html" class="hover:text-red-500 transition">Compare</a>

                    <button
                        id="themeToggle"
                        type="button"
                        data-theme-toggle
                        class="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded-lg"
                    >
                        <i class="fa-solid fa-moon"></i>
                    </button>
                </div>

                <div class="hidden md:flex items-center gap-3">
                    <input
                        type="text"
                        id="movieSearch"
                        placeholder="Search movies..."
                        class="w-48 lg:w-56 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                    >

                    <img
                        src="https://i.pravatar.cc/101"
                        alt="Profile"
                        class="w-10 h-10 rounded-full object-cover"
                    >
                </div>

                <div class="flex md:hidden items-center gap-2">

                    <button
                        id="mobileSearchBtn"
                        type="button"
                        class="text-gray-900 dark:text-white p-2"
                        aria-controls="mobileSearchContainer"
                        aria-expanded="false"
                        aria-label="Search"
                    >
                        Search
                    </button>

                    <button
                        id="menuBtn"
                        type="button"
                        class="text-gray-900 dark:text-white p-2"
                        aria-controls="mobileMenu"
                        aria-expanded="false"
                        aria-label="Menu"
                    >
                        ☰
                    </button>

                </div>
            </div>

            <div id="mobileSearchContainer"
                class="absolute top-full right-4 z-50 hidden w-56 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-3">

                <input
                    type="text"
                    id="mobileMovieSearch"
                    placeholder="Search movies..."
                    class="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded-lg"
                >
            </div>

            <div id="mobileMenu"
                class="absolute top-full left-0 z-40 hidden w-full bg-white dark:bg-gray-900 shadow-xl border-t border-gray-200 dark:border-gray-700">

                <div class="flex flex-col gap-5 px-6 py-5 text-gray-700 dark:text-gray-300">

                    <a href="index.html">Home</a>
                    <a href="watchlist.html">Watchlist</a>
                    <a href="compare.html">Compare</a>

                    <button
                        id="mobileThemeToggle"
                        type="button"
                        data-theme-toggle
                        class="text-left bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg"
                    >
                        <i class="fa-solid fa-moon"></i>
                    </button>

                    <img
                        src="https://i.pravatar.cc/101"
                        alt="Profile"
                        class="w-10 h-10 rounded-full object-cover"
                    >

                </div>
            </div>
        </nav>
    `;
}

export function initializeNavbar() {

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    const searchBtn = document.getElementById("mobileSearchBtn");
    const searchContainer = document.getElementById("mobileSearchContainer");

    const mobileSearch = document.getElementById("mobileMovieSearch");
    const desktopSearch = document.getElementById("movieSearch");

    menuBtn?.addEventListener("click", () => {
        mobileMenu?.classList.toggle("hidden");
        searchContainer?.classList.add("hidden");
    });

    searchBtn?.addEventListener("click", () => {
        searchContainer?.classList.toggle("hidden");
        mobileMenu?.classList.add("hidden");
        mobileSearch?.focus();
    });

    if (desktopSearch && mobileSearch) {
        desktopSearch.addEventListener("input", () => {
            mobileSearch.value = desktopSearch.value;
        });

        mobileSearch.addEventListener("input", () => {
            desktopSearch.value = mobileSearch.value;
        });
    }

    initializeThemeToggle();
}
