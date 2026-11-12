# CineScope

A movie browser built with HTML, Tailwind CSS, and vanilla JavaScript modules. Movie data is provided by TMDB.

## Run locally

The pages use ES modules, so open the project through a local web server instead of opening `index.html` directly.

With Python installed, run this from the project folder:

```powershell
py -m http.server 8000
```

Then open `http://localhost:8000` in a browser. The app needs an internet connection for TMDB data and Tailwind CSS.

## Main pages

- `index.html` — browse and search movies
- `details.html?id=<movie-id>` — view a movie; the URL can be shared or refreshed
- `watchlist.html` — manage saved movies
- `compare.html` — compare selected movies

## Quick QA checklist

- Search for a movie, clear the search, and try a search with no matches.
- Open a movie, add it to the watchlist, mark it watched, and remove it.
- Try a missing or invalid movie ID, such as `details.html?id=not-a-number`.
- Use the menu and search controls at a mobile viewport and check that pages fit without horizontal scrolling.
- Disable network access and confirm the app displays an error instead of failing silently.
- Check a movie without a poster and confirm the fallback image appears.

Watchlist data is stored in the browser's LocalStorage. Clearing site data removes it.

## Deployment

The app is static and can be hosted on any static web host that serves the project files and supports JavaScript ES modules. Upload the project contents without changing the page paths; direct links to `details.html?id=...` must be served correctly. Deployment is not configured in this repository because no hosting provider has been selected.
