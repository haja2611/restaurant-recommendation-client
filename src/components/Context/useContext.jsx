// useContext.js

import { createContext, useState } from "react";

const RestaurantContext = createContext();

const Provider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [location, setLocation] = useState();
  const [rating, setRating] = useState();

  // ✅ Add these new state variables
  const [ambience, setAmbience] = useState([]);
  const [dietary, setDietary] = useState([]);
  const [diningType, setDiningType] = useState([]);
  const [weather, setWeather] = useState([]);
  const [transport, setTransport] = useState([]);
  const [timing, setTiming] = useState([]);

  const data = {
    selectedItems,
    setSelectedItems,
    location,
    setLocation,
    rating,
    setRating,

    // ✅ Include these in the context value
    ambience,
    setAmbience,
    dietary,
    setDietary,
    diningType,
    setDiningType,
    weather,
    setWeather,
    transport,
    setTransport,
    timing,
    setTiming,
  };

  return (
    <RestaurantContext.Provider value={data}>
      {children}
    </RestaurantContext.Provider>
  );
};

export { Provider, RestaurantContext };
