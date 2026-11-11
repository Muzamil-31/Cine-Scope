
export function renderSearchBar() {
    return `
        <section class="p-5">

            <div class="flex flex-wrap gap-3">

                <select id="genreFilter" class="bg-gray-900 p-3 rounded-lg">
                    <option value="">All Genres</option>
                    <option value="Action">Action</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Drama">Drama</option>
                    <option value="Horror">Horror</option>
                </select>

                <select id="yearFilter" class="bg-gray-900 p-3 rounded-lg">
                    <option value="">All Years</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
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
                </select>

            </div>

        </section>
    `;
}
