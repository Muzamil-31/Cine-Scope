export function renderFooter() {
    return `
        <footer class="bg-[#111827] text-gray-400 mt-16 border-t border-gray-800">

            <div class="max-w-7xl mx-auto px-6 py-12">

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    <!-- Brand -->
                    <div>
                        <h2 class="text-3xl font-bold text-red-500 mb-4">
                            CineScope<span class="text-white">.</span>
                        </h2>

                        <p class="text-sm leading-7">
                            Your ultimate destination to discover movies,
                            explore stories, and find your next favorite film.
                        </p>

                        <p class="text-sm mt-4">
                            Discover. Watchlist. Enjoy.
                        </p>
                    </div>

                    <!-- Explore -->
                    <div>
                        <h3 class="text-white font-semibold text-lg mb-5">
                            Explore
                        </h3>

                        <ul class="space-y-3 text-sm">
                            <li><a href="index.html" class="hover:text-red-500">Home</a></li>
                            <li><a href="index.html" class="hover:text-red-500">Trending Movies</a></li>
                            <li><a href="index.html" class="hover:text-red-500">Popular Movies</a></li>
                            <li><a href="index.html" class="hover:text-red-500">Top Rated Movies</a></li>
                            <li><a href="index.html" class="hover:text-red-500">Upcoming Movies</a></li>
                        </ul>
                    </div>

                    <!-- Genres -->
                    <div>
                        <h3 class="text-white font-semibold text-lg mb-5">
                            Movie Genres
                        </h3>

                        <ul class="space-y-3 text-sm">
                            <li>Action</li>
                            <li>Adventure</li>
                            <li>Comedy</li>
                            <li>Drama</li>
                            <li>Horror</li>
                            <li>Science Fiction</li>
                        </ul>
                    </div>

                    <!-- Quick Links -->
                    <div>
                        <h3 class="text-white font-semibold text-lg mb-5">
                            Quick Links
                        </h3>

                        <ul class="space-y-3 text-sm">
                            <li>
                                <a href="watchlist.html" class="hover:text-red-500">
                                    My Watchlist
                                </a>
                            </li>
                            <li>
                                <a href="index.html" class="hover:text-red-500">
                                    Discover Movies
                                </a>
                            </li>
                            <li>
                                <a href="index.html" class="hover:text-red-500">
                                    Search Movies
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>


                <!-- Copyright and Social Links -->
                <div class="border-t border-gray-800 mt-8 pt-6">

                    <div class="flex flex-col md:flex-row justify-between items-center gap-4">

                        <p class="text-sm text-center">
                            © 2026 CineScope. All rights reserved.
                        </p>

                        <div class="flex gap-5 text-sm">
                            <a href="#" class="hover:text-red-500">Instagram</a>
                            <a href="#" class="hover:text-red-500">YouTube</a>
                            <a href="#" class="hover:text-red-500">Facebook</a>
                        </div>

                    </div>

                </div>

            </div>

        </footer>
    `;
}
