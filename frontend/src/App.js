import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewsPage from "./pages/NewsPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<NewsPage />} />
            </Routes>
        </Router>
    );
}

export default App;
