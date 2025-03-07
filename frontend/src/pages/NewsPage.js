import React, { useEffect, useState } from "react";
import axios from "axios";

const categories = ["general", "business", "entertainment", "health", "science", "sports", "technology"];

function NewsPage() {
    const [news, setNews] = useState([]);
    const [category, setCategory] = useState("general");
    const [loading, setLoading] = useState(false);

    const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);

    useEffect(() => {
        fetchNews(category);
    }, [category]);

    const fetchNews = async (selectedCategory) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/news?category=${selectedCategory}`);
            setNews(response.data.articles);
        } catch (error) {
            console.error("Error fetching news", error);
        }
        setLoading(false);
    };

    const toggleFavorite = (article) => {
        let updatedFavorites = [...favorites];
        if (favorites.some(fav => fav.url === article.url)) {
            updatedFavorites = favorites.filter(fav => fav.url !== article.url);
        } else {
            updatedFavorites.push(article);
        }
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    // Dark Mode Toggle Function
    const toggleTheme = () => {
        document.body.classList.toggle("dark");
    };

    return (
        <div className="container">
            <h1>News Aggregator</h1>

            <button className="toggle-dark-mode" onClick={toggleTheme}>
                Toggle Dark Mode
            </button>

            <div className="category-container">
                {categories.map((cat) => (
                    <button key={cat} onClick={() => setCategory(cat)}>{cat}</button>
                ))}
            </div>

            {loading ? <p>Loading...</p> : 
            <div className="news-container">
                {news.map((article, index) => (
                    <div key={index} className="news-card">
                        <img src={article.urlToImage} alt={article.title} />
                        <h2>{article.title}</h2>
                        <p>{article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>

                        <button className={`favorite-btn ${favorites.some(fav => fav.url === article.url) ? "active" : ""}`} onClick={() => toggleFavorite(article)}>
                            {favorites.some(fav => fav.url === article.url) ? "Remove from Favorites" : "Add to Favorites"}
                        </button>

                    </div>
                ))}
            </div>}
        </div>
    );
}

export default NewsPage;
