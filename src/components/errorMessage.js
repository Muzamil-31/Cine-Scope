
export function renderError() {
    return `
        <div class="text-center py-10">

            <h2 class="text-xl font-bold text-white">
                Something went wrong!
            </h2>

            <p class="text-gray-400 mt-2">
                Unable to load movies. Please try again.
            </p>

            <button
                id="retryBtn"
                class="bg-red-600 px-5 py-2 rounded-lg mt-4"
            >
                Retry
            </button>

        </div>
    `;
}
let movieCache = {};

export async function getMovies(url) {

    if (movieCache[url]) {
        return movieCache[url];
    }

    const response = await fetch(url);

    const data = await response.json();

    movieCache[url] = data;

    return data;
}