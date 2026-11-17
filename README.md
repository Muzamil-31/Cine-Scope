# CineScope

A movie browsing application built with **HTML, Tailwind CSS, Vanilla JavaScript (ES Modules), Node.js, and Express.js**. Movie data is provided by the [TMDB API](https://www.themoviedb.org/).

## Run Locally

The application uses JavaScript ES Modules, so it must be opened through a local web server instead of directly opening `index.html`.

1. Install the **Live Server** extension in VS Code.
2. Open the CineScope project folder in VS Code.
3. Right-click `index.html`.
4. Select **Open with Live Server**.
5. The application will open in your browser.

### Backend Setup

The backend uses Node.js and Express.js to securely communicate with the TMDB API.

1. Open the backend folder in your terminal.
2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file inside the backend folder.
4. Add your TMDB configuration:

   ```env
   TMDB_BASE_URL=https://api.themoviedb.org/3
   TMDB_API_TOKEN=your_tmdb_read_access_token
   PORT=3000
   ```

5. Start the backend server:

   ```bash
   npm start
   ```

6. The backend will run locally at:

   ```text
   http://localhost:3000
   ```

**Note:** Replace `your_tmdb_read_access_token` with your actual TMDB API Read Access Token.

Never expose your API token in frontend JavaScript or commit your `.env` file to GitHub.

### Environment Variables

| Variable | Description |
|---|---|
| `TMDB_BASE_URL` | TMDB API base URL |
| `TMDB_API_TOKEN` | TMDB API Read Access Token |
| `PORT` | Local backend server port |

The `.env` file should be included in `.gitignore`:

```gitignore
node_modules/
.env
backend/.env
```

An active internet connection is required to load TMDB movie data and Tailwind CSS.

## Main Pages

| Page | Description |
|---|---|
| `index.html` | Browse and search movies |
| `details.html` | View detailed movie information |
| `watchlist.html` | Manage saved movies |
| `compare.html` | Compare selected movies |

Movie detail URLs can be shared or refreshed using the movie ID.

## Backend API

The Express backend provides a common endpoint for frontend movie requests.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check backend status |
| GET | `/api/movies?endpoint=/movie/popular` | Fetch popular movies |
| GET | `/api/movies?endpoint=/trending/movie/day` | Fetch trending movies |
| GET | `/api/movies?endpoint=/movie/top_rated` | Fetch top-rated movies |
| GET | `/api/movies?endpoint=/movie/upcoming` | Fetch upcoming movies |

The backend forwards requests to TMDB and returns the API response to the frontend.

## Quick QA Checklist

- Search for a movie, clear the search, and try a search with no matches.
- Open a movie, add it to the watchlist, mark it as watched, and remove it.
- Test a missing or invalid movie ID, such as `details.html?id=not-a-number`.
- Test the navigation menu and search controls on mobile screens.
- Check that pages fit without unwanted horizontal scrolling.
- Disable network access and confirm the application displays an error message.
- Check a movie without a poster and confirm the fallback image appears.
- Verify that backend API requests return valid movie data.

## Data Storage

Watchlist data is stored in the browser's **LocalStorage**.

Clearing the browser's site data will remove the saved watchlist.

## Deployment

CineScope is deployed as a static frontend application with a separate Node.js and Express.js backend.

### Frontend Deployment

- HTML, Tailwind CSS, and Vanilla JavaScript ES Modules.
- Multiple HTML pages are supported.
- JavaScript modules and static assets are served correctly.
- Movie detail pages use URL query parameters, such as `details.html?id=<movie-id>`.

### Backend Deployment

- Built using Node.js and Express.js.
- TMDB credentials are configured through environment variables.
- API tokens are kept out of frontend source code.
- The frontend communicates with the deployed backend to retrieve movie data.

**Required Backend Environment Variables:**

```env
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_API_TOKEN=your_tmdb_read_access_token
```

Do not upload `.env` files or expose API credentials in the repository.

**Live Demo:** 

---

Built with **HTML, Tailwind CSS, Vanilla JavaScript, Node.js, Express.js, and TMDB API**.
