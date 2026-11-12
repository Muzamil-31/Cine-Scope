
export function renderSearchBar(genres = [], movies = []) {

    // Get all available release years and sort newest first
    const years = [
        ...new Set(
            movies
                .map(movie => movie.release_date?.split("-")[0])
                .filter(Boolean)
        )
    ].sort((a, b) => Number(b) - Number(a));

    return `
        <section class="p-5">

            <div class="flex flex-wrap gap-3">

                <select id="genreFilter" class="bg-gray-900 p-3 rounded-lg">
                    <option value="">All Genres</option>

                    ${genres.map(genre => `
                        <option value="${genre.id}">
                            ${genre.name}
                        </option>
                    `).join("")}

                </select>

                <select id="yearFilter" class="bg-gray-900 p-3 rounded-lg">
                    <option value="">All Years</option>

                    ${years.map(year => `
                        <option value="${year}">${year}</option>
                    `).join("")}

                </select>

                <select id="ratingFilter" class="bg-gray-900 p-3 rounded-lg">
                    <option value="">All Ratings</option>
                    <option value="7">7+</option>
                    <option value="8">8+</option>
                    <option value="9">9+</option>
                </select>

                <select id="sortFilter" class="bg-gray-900 p-3 rounded-lg">
                    <option value="">Default</option>
                    <option value="rating">Highest Rating</option>
                    <option value="popularity">Most Popular</option>
                    <option value="year">Newest First</option>
                </select>

            </div>

        </section>
    `;
}
