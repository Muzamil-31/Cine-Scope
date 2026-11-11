
import { trendingMovies } from "../data/movies.js";

export function renderMovieBanner() {
    const movies = trendingMovies.slice(0, 5);

    return `
        <section class="relative h-[450px] md:h-[800px] overflow-hidden">

            <div
                id="bannerTrack"
                class="flex h-full transition-transform duration-700 ease-in-out"
            >

                ${movies.map(movie => `
                    <div
                        class="min-w-full h-full flex items-end bg-cover bg-center"
                        style="
                            background-image:
                            linear-gradient(to top, #030712, rgba(3,7,18,0.3)),
                            url('${movie.backdrop}');
                        "
                    >

                        <div class="max-w-2xl p-8 md:p-12">

                            <h2 class="text-4xl md:text-5xl font-bold mb-4">
                                ${movie.title}
                            </h2>

                            <div class="flex gap-4 text-sm text-gray-300 mb-4">
                                <span>${movie.year}</span>
                                <span>⭐ ${movie.rating}</span>
                            </div>

                            <p class="text-gray-300 mb-6 leading-relaxed">
                                ${movie.overview}
                            </p>

                            <div class="flex gap-3">
                                <button class="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg">
                                    Watch Now
                                </button>

                                <button class="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg">
                                    More Info
                                </button>
                            </div>

                        </div>
                    </div>
                `).join("")}

            </div>

            <!-- Slide Indicators -->
            <div class="absolute bottom-6 right-8 flex items-center gap-2 z-20">

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

        // Change banner
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update indicators
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
