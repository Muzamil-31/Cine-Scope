
import { renderMovieCard } from "./movieCard.js";

export function renderMovieSection(title, movies = []) {

    let movieHTML = "";

    for (let i = 0; i < movies.length; i++) {
        movieHTML += renderMovieCard(movies[i], true);
    }

    return `
        <section class="px-5 md:px-8 py-6">

            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold">${title}</h2>

                <div class="flex gap-2">
                    <button
                        class="scrollLeft bg-gray-800 hover:bg-red-600 p-2 rounded-full"
                        aria-label="Scroll left"
                        type="button"
                    >
                        &#10094;
                    </button>

                    <button
                        class="scrollRight bg-gray-800 hover:bg-red-600 p-2 rounded-full"
                        aria-label="Scroll right"
                        type="button"
                    >
                        &#10095;
                    </button>
                </div>
            </div>

            <div
                class="movieContainer flex gap-5 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none]"
            >
                ${movieHTML}
            </div>

        </section>
    `;
}


export function initializeMovieSections() {

    document.querySelectorAll(".movieContainer").forEach(container => {

        const section = container.closest("section");

        if (!section) return;

        const leftBtn = section.querySelector(".scrollLeft");
        const rightBtn = section.querySelector(".scrollRight");

        leftBtn?.addEventListener("click", () => {

            container.scrollBy({
                left: -400,
                behavior: "smooth"
            });

        });

        rightBtn?.addEventListener("click", () => {

            container.scrollBy({
                left: 400,
                behavior: "smooth"
            });

        });

    });

}
