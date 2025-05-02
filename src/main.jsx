import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider } from "./components/Context/useContext.jsx";
import Login from "./components/Authentication/Login.jsx";
import Register from "./components/Authentication/Register.jsx";
import FavoritesPage from "../src/components/RestaurantCard/FavoritesPage.jsx";
import NavBar from "./components/NavBar/NavBar";
import "leaflet/dist/leaflet.css";
import MapPage from "./components/Map/MapPage.jsx";
import CardItem from "./components/RestaurantCard/EnhancedCard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<App />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/map-view" element={<MapPage />} />
          <Route path="/AI-recommendation" element={<CardItem />} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
);
