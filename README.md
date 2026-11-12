# CineScope

A movie browsing application built with **HTML, Tailwind CSS, and Vanilla JavaScript (ES Modules)**. Movie data is provided by the [TMDB API](https://www.themoviedb.org/).

## Run Locally

The application uses JavaScript ES Modules, so it must be opened through a local web server instead of directly opening `index.html`.

1. Install the **Live Server** extension in VS Code.
2. Open the CineScope project folder in VS Code.
3. Right-click `index.html`.
4. Select **Open with Live Server**.
5. The application will open in your browser.

**Note:** An active internet connection is required to load TMDB movie data and Tailwind CSS.

## Main Pages

| Page | Description |
|---|---|
| `index.html` | Browse and search movies |
| `details.html?id=<movie-id>` | View detailed movie information |
| `watchlist.html` | Manage saved movies |
| `compare.html` | Compare selected movies |

Movie detail URLs can be shared or refreshed using the movie ID.

## Quick QA Checklist

- [ ] Search for a movie, clear the search, and try a search with no matches.
- [ ] Open a movie, add it to the watchlist, mark it as watched, and remove it.
- [ ] Test a missing or invalid movie ID, such as `details.html?id=not-a-number`.
- [ ] Test the navigation menu and search controls on mobile screens.
- [ ] Check that pages fit without unwanted horizontal scrolling.
- [ ] Disable network access and confirm the application displays an error message.
- [ ] Check a movie without a poster and confirm the fallback image appears.

## Data Storage

Watchlist data is stored in the browser's **LocalStorage**.

Clearing the browser's site data will remove the saved watchlist.

## Deployment

CineScope is a static web application that can be hosted on any static web hosting platform that supports JavaScript ES Modules.

For deployment:

- Upload the project files without changing the existing page paths.
- Ensure that JavaScript modules and assets are served correctly.
- Verify that direct movie detail URLs, such as `details.html?id=<movie-id>`, work correctly.

Deployment is not currently configured in this repository because no hosting provider has been selected.

---

Built with HTML, Tailwind CSS, JavaScript, and TMDB.