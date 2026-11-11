
export function renderNavbar() {
    return `
        <nav class="sticky top-0 z-50 bg-gray-900 px-4 md:px-8 py-4">

            <div class="flex items-center justify-between">

                <a href="#" class="text-2xl font-bold text-red-500">
                    CineScope
                </a>

                <div class="hidden md:flex items-center gap-8 text-gray-300">
                    <a href="#" class="hover:text-red-500">Home</a>
                    <a href="watchlist.html" class="hover:text-red-500">Watchlist</a>
                    <a href="#" class="hover:text-red-500">Compare</a>
                </div>

                <div class="flex items-center gap-3">
                    <input
    type="text"
    id="movieSearch"
    placeholder="Search movies..."
    class="bg-gray-800 text-white px-4 py-2 rounded-lg"
/>

                    <button
    id="profileBtn"
    class="w-10 h-10 rounded-full bg-red-600 text-white font-bold flex items-center justify-center hover:bg-red-700"
    title="Profile"
>
    <img
    src="https://i.pravatar.cc/101"
    alt="Profile"
    class="w-10 h-10 rounded-full object-cover cursor-pointer"
/>
</button>
                </div>

            </div>

        </nav>
    `;
}
