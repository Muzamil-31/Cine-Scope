const IMAGE_URL = "https://image.tmdb.org/t/p/original";

export function renderMovieBanner(movies, genres = []) {

    const bannerMovies = movies.slice(0, 5);

    return `
        <section class="relative w-full h-[450px] sm:h-[520px] md:h-[750px] overflow-hidden bg-gray-950">

            <div
                id="bannerTrack"
                class="flex h-full transition-transform duration-700 ease-in-out"
            >

                ${bannerMovies.map(movie => {

                    const year = movie.release_date
                        ? movie.release_date.split("-")[0]
                        : "N/A";

                    const runtime = Number.isFinite(movie.runtime) && movie.runtime > 0
                        ? `${movie.runtime} min`
                        : "N/A";

                    const movieGenres = movie.genre_ids
                        ?.map(id => genres.find(genre => genre.id === id)?.name)
                        .filter(Boolean)
                        .join(", ");

                    return `
                        <div
                            class="relative min-w-full h-full bg-cover bg-top flex items-end text-white"
                            style="
                                background-image:
                                    linear-gradient(
                                        to top,
                                        rgba(3, 7, 18, 0.95) 0%,
                                        rgba(3, 7, 18, 0.65) 35%,
                                        rgba(3, 7, 18, 0.25) 65%,
                                        rgba(3, 7, 18, 0.10) 100%
                                    ),
                                    url('${movie.backdrop_path ? IMAGE_URL + movie.backdrop_path : ""}');
                            "
                        >

                            <div class="w-full px-4 pb-16 sm:px-8 sm:pb-20 md:px-12 md:pb-24">

                                <div class="max-w-2xl">

                                    <h2 class="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                                        ${movie.title}
                                    </h2>

                                    <div class="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-200 mb-3">
                                        <span>${year}</span>
                                        <span>•</span>
                                        <span>${runtime}</span>
                                        <span>•</span>
                                        <span>Rating ${movie.vote_average?.toFixed(1) || "N/A"}</span>
                                    </div>

                                    <p class="text-red-400 text-sm font-semibold mb-3">
                                        ${movieGenres || "Movie"}
                                    </p>

                                    <p class="text-sm sm:text-base text-gray-200 mb-5 sm:mb-6 leading-relaxed line-clamp-3">
                                        ${movie.overview || "No description available."}
                                    </p>

                                    <div class="flex flex-wrap gap-3">

                                        <button
                                            type="button"
                                            class="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg transition"
                                        >
                                            Watch Now
                                        </button>

                                        <button
                                            type="button"
                                            class="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg transition"
                                        >
                                            More Info
                                        </button>

                                    </div>

                                </div>
                            </div>
                        </div>
                    `;
                }).join("")}

            </div>

            <div class="absolute bottom-5 right-4 sm:right-8 flex items-center gap-2 z-20">

                ${bannerMovies.map((movie, index) => `
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
