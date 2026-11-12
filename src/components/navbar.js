
export function renderNavbar() {
    return `
        <nav class="sticky top-0 z-50 bg-gray-900 px-4 md:px-8 py-4">

            <div class="relative flex items-center justify-between gap-3">

                <!-- Logo -->
                <a href="index.html" class="text-2xl font-bold text-red-500 shrink-0">
                    CineScope
                </a>

                <!-- Desktop Navigation -->
                <div class="hidden md:flex items-center gap-8 text-gray-300">
                    <a href="index.html" class="hover:text-red-500 transition">Home</a>
                    <a href="watchlist.html" class="hover:text-red-500 transition">Watchlist</a>
                    <a href="compare.html" class="hover:text-red-500 transition">Compare</a>
                </div>

                <!-- Desktop Search -->
                <div class="hidden md:flex items-center gap-3">
                    <input
                        type="text"
                        id="movieSearch"
                        placeholder="Search movies..."
                        class="w-48 lg:w-56 bg-gray-800 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                    >

                    <img
                        src="https://i.pravatar.cc/101"
                        alt="Profile"
                        class="w-10 h-10 rounded-full object-cover"
                    >
                </div>

                <!-- Mobile Actions -->
                <div class="flex md:hidden items-center gap-2">

                    <button
                        id="mobileSearchBtn"
                        class="text-white p-2"
                        type="button"
                        aria-controls="mobileSearchContainer"
                        aria-expanded="false"
                        aria-label="Search"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="22" height="22"
                            viewBox="0 0 24 24"
                            fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round">
                            <circle cx="11" cy="11" r="7"></circle>
                            <path d="m20 20-4-4"></path>
                        </svg>
                    </button>

                    <button
                        id="menuBtn"
                        class="text-white p-2"
                        type="button"
                        aria-controls="mobileMenu"
                        aria-expanded="false"
                        aria-label="Menu"
                    >
                        <svg id="menuIcon" xmlns="http://www.w3.org/2000/svg"
                            width="25" height="25"
                            viewBox="0 0 24 24"
                            fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round">
                            <path d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>

                </div>

            </div>

            <!-- Mobile Search Overlay -->
            <div
                id="mobileSearchContainer"
                class="absolute top-full right-4 z-50 hidden w-56 overflow-hidden bg-gray-900 rounded-lg shadow-xl"
            >
                <div class="p-3">
                    <input
                        type="text"
                        id="mobileMovieSearch"
                        placeholder="Search movies..."
                        class="w-full bg-gray-800 text-white px-3 py-2 text-sm rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                    >
                </div>
            </div>

            <!-- Mobile Menu Overlay -->
            <div
                id="mobileMenu"
                class="absolute top-full left-0 z-40 hidden w-full bg-gray-900 shadow-xl"
            >
                <div class="flex flex-col gap-5 px-6 py-5 text-gray-300">

                    <a href="index.html" class="hover:text-red-500 transition">
                        Home
                    </a>

                    <a href="watchlist.html" class="hover:text-red-500 transition">
                        Watchlist
                    </a>

                    <a href="compare.html" class="hover:text-red-500 transition">
                        Compare
                    </a>

                    <div class="border-t border-gray-700 pt-4">
                        <img
                            src="https://i.pravatar.cc/101"
                            alt="Profile"
                            class="w-10 h-10 rounded-full object-cover"
                        >
                    </div>

                </div>
            </div>

        </nav>
    `;
}


export function initializeNavbar() {

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const menuIcon = document.getElementById("menuIcon");

    const searchBtn = document.getElementById("mobileSearchBtn");
    const searchContainer = document.getElementById("mobileSearchContainer");

    const mobileSearch = document.getElementById("mobileMovieSearch");
    const desktopSearch = document.getElementById("movieSearch");

    // Hamburger Menu
    menuBtn?.addEventListener("click", () => {

        if (!mobileMenu || !searchContainer || !searchBtn) return;

        const isOpen = menuBtn.getAttribute("aria-expanded") === "true";

        // Close search
        searchContainer.classList.add("hidden");

        searchBtn.setAttribute("aria-expanded", "false");

        if (isOpen) {

            mobileMenu.classList.add("hidden");

            menuBtn.setAttribute("aria-expanded", "false");

            if (menuIcon) {
                menuIcon.innerHTML =
                    '<path d="M4 6h16M4 12h16M4 18h16"></path>';
            }

        } else {

            mobileMenu.classList.remove("hidden");

            menuBtn.setAttribute("aria-expanded", "true");

            if (menuIcon) {
                menuIcon.innerHTML =
                    '<path d="m18 6-12 12M6 6l12 12"></path>';
            }
        }

    });


    // Mobile Search
    searchBtn?.addEventListener("click", () => {

        if (!searchContainer || !mobileMenu || !menuBtn) return;

        const isOpen = searchBtn.getAttribute("aria-expanded") === "true";

        // Close menu
        mobileMenu.classList.add("hidden");

        menuBtn.setAttribute("aria-expanded", "false");

        if (menuIcon) {
            menuIcon.innerHTML =
                '<path d="M4 6h16M4 12h16M4 18h16"></path>';
        }

        if (isOpen) {

            searchContainer.classList.add("hidden");

            searchBtn.setAttribute("aria-expanded", "false");

        } else {

            searchContainer.classList.remove("hidden");

            searchBtn.setAttribute("aria-expanded", "true");

            mobileSearch?.focus();
        }

    });


    // Synchronize Search Inputs
    if (desktopSearch && mobileSearch) {

        desktopSearch.addEventListener("input", () => {
            mobileSearch.value = desktopSearch.value;
        });

        mobileSearch.addEventListener("input", () => {
            desktopSearch.value = mobileSearch.value;
        });

    }

}
