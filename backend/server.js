
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.TMDB_BASE_URL;
const API_TOKEN = process.env.TMDB_API_TOKEN;

// Test backend route
app.get("/", (req, res) => {
    res.send("CineScope Backend is running!");
});

// TMDB API request route
app.get("/api/movies", async (req, res) => {
    try {
        const endpoint = req.query.endpoint;

        if (
            typeof endpoint !== "string" ||
            !endpoint.startsWith("/") ||
            endpoint.startsWith("//")
        ) {
            return res.status(400).json({
                error: "Invalid TMDB endpoint"
            });
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${API_TOKEN?.trim()}`
            }
        });

        const data = await response.json();

        console.log("TMDB status:", response.status);

        res.status(response.status).json(data);

    } catch (error) {
        console.error("Backend Error:", error);

        res.status(500).json({
            error: "Failed to fetch movies from TMDB"
        });
    }
});

// Start backend server
app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
