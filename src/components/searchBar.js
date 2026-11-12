
export function renderSearchBar(genres = [], movies = []) {

    // Get all available release years and sort newest first
    const years = [
        ...new Set(
            movies
                .map(movie => movie.release_date?.split("-")[0])
                .filter(Boolean)
        )
    ].sort((a, b) => Number(b) - Number(a));

    const selectClass = `
        bg-gray-100 dark:bg-gray-900
        text-gray-900 dark:text-white
        border border-gray-300 dark:border-gray-700
        p-3 rounded-lg
        outline-none
        focus:ring-2 focus:ring-red-500
    `;

    return `
        <section class="p-5">

            <div class="flex flex-wrap gap-3">

                <select id="genreFilter" class="${selectClass}">
                    <option value="">All Genres</option>

                    ${genres.map(genre => `
                        <option value="${genre.id}">
                            ${genre.name}
                        </option>
                    `).join("")}

                </select>

                <select id="yearFilter" class="${selectClass}">
                    <option value="">All Years</option>

                    ${years.map(year => `
                        <option value="${year}">${year}</option>
                    `).join("")}

                </select>

                <select id="ratingFilter" class="${selectClass}">
                    <option value="">All Ratings</option>
                    <option value="7">7+</option>
                    <option value="8">8+</option>
                    <option value="9">9+</option>
                </select>

                <select id="sortFilter" class="${selectClass}">
                    <option value="">Default</option>
                    <option value="rating">Highest Rating</option>
                    <option value="popularity">Most Popular</option>
                    <option value="year">Newest First</option>
                </select>

            </div>

        </section>
    `;
}
