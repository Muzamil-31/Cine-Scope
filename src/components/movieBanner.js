import { trendingMovies } from "../data/movies.js";

export function renderMovieBanner() {
    const movies = trendingMovies.slice(0, 5);

    return `
        <section class="relative w-full h-[520px] sm:h-[600px] md:h-[800px] overflow-hidden">

            <div
                id="bannerTrack"
                class="flex h-full transition-transform duration-700 ease-in-out"
            >

                ${movies.map(movie => `
                    <div
                        class="relative min-w-full h-full bg-cover bg-center flex items-end"
                        style="
                            background-image:
                            linear-gradient(to top, #030712 5%, rgba(3,7,18,0.65) 45%, rgba(3,7,18,0.1) 100%),
                            url('${movie.backdrop}');
                        "
                    >

                        <div class="w-full px-4 pb-16 sm:px-8 sm:pb-20 md:px-12 md:pb-24">

                            <div class="max-w-2xl">

                                <h2 class="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                                    ${movie.title}
                                </h2>

                                <div class="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-300 mb-3">
                                    <span>${movie.year}</span>
                                    <span>•</span>
                                    <span>${movie.runtime} min</span>
                                    <span>•</span>
                                    <span>⭐ ${movie.rating}</span>
                                </div>

                                <p class="text-red-400 text-sm font-semibold mb-3">
                                    ${movie.genre}
                                </p>

                                <p class="text-sm sm:text-base text-gray-300 mb-5 sm:mb-6 leading-relaxed line-clamp-3">
                                    ${movie.overview}
                                </p>

                                <div class="flex flex-wrap gap-3">

                                    <button class="bg-red-600 hover:bg-red-700 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg">
                                        Watch Now
                                    </button>

                                    <button class="bg-gray-700 hover:bg-gray-600 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg">
                                        More Info
                                    </button>

                                </div>

                            </div>
                        </div>
                    </div>
                `).join("")}

            </div>

            <div class="absolute bottom-5 right-4 sm:right-8 flex items-center gap-2 z-20">

                ${movies.map((movie, index) => `
                    <div
                        class="banner-indicator h-2 rounded-full transition-all duration-500
                        ${index === 0 ? "w-8 bg-red-600" : "w-2 bg-white/60"}"
                    ></div>
                `).join("")}

            </div>

        </section>
    `;
}

export function initializeMovieBanner() {

    const track = document.getElementById("bannerTrack");

    if (!track) return;

    const totalSlides = track.children.length;

    if (totalSlides <= 1) return;

    const indicators = document.querySelectorAll(".banner-indicator");

    let currentIndex = 0;

    setInterval(() => {

        currentIndex = (currentIndex + 1) % totalSlides;

        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        indicators.forEach((indicator, index) => {

            if (index === currentIndex) {
                indicator.classList.remove("w-2", "bg-white/60");
                indicator.classList.add("w-8", "bg-red-600");
            } else {
                indicator.classList.remove("w-8", "bg-red-600");
                indicator.classList.add("w-2", "bg-white/60");
            }

        });

    }, 5000);
}
