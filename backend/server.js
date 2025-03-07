require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const NEWS_API_URL = "https://newsapi.org/v2/top-headlines";
const API_KEY = process.env.NEWS_API_KEY;

app.get("/news", async (req, res) => {
    const category = req.query.category || "general";
    try {
        const response = await axios.get(NEWS_API_URL, {
            params: {
                category,
                country: "us",
                apiKey: API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching news" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
