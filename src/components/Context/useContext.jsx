// useContext.js

import { createContext, useState } from "react";

const RestaurantContext = createContext();

const Provider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [location, setLocation] = useState();
  const [rating, setRating] = useState();

  const data = {
    selectedItems,
    setSelectedItems,
    location,
    setLocation,
    rating,
    setRating,
  };

  return (
    <RestaurantContext.Provider value={data}>
      {children}
    </RestaurantContext.Provider>
  );
};

export { Provider, RestaurantContext };
