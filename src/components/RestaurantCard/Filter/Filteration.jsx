import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FilterAccordion from "./FilterAccordion";
import useRestaurantContext from "../../Hooks/useRestaurant";

const Filteration = ({ show, onHide, restaurants }) => {
  const {
    setSelectedItems,
    setLocation,
    setRating,
    setAmbience,
    setDietary,
    setDiningType,
    setWeather,
    setTransport,
    setTiming,
  } = useRestaurantContext();

  const [tempState, setTempState] = useState({
    selectedItems: [],
    location: null,
    rating: null,
    ambience: [],
    dietary: [],
    diningType: [],
    weather: [],
    transport: [],
    timing: [],
  });

  const [noMatch, setNoMatch] = useState(false);

  const updateField = (field, value) => {
    setTempState((prev) => ({ ...prev, [field]: value }));
  };

  // Filter configuration that matches your schema
  const filterConfigs = [
    {
      title: "Location",
      key: "location",
      options: [
        "Chennai",
        "Hyderabad",
        "Mumbai",
        "Delhi",
        "Banglore",
        "Pune",
        "Kerala",
      ],
      type: "radio",
    },
    {
      title: "Cuisine",
      key: "selectedItems",
      options: [
        "North Indian",
        "South Indian",
        "Italian",
        "Chinese",
        "Mexican",
        "Pastas",
        "Pizzas",
        "Barbecue",
        "Seafood",
        "Desserts",
      ],
      type: "checkbox",
    },
    {
      title: "Minimum Rating",
      key: "rating",
      options: [1, 2, 3, 4, 5],
      type: "radio",
    },
    {
      title: "Ambience",
      key: "ambience",
      options: ["Casual", "Fine Dining", "Cafe", "Pub", "Family-Friendly"],
      type: "checkbox",
    },
    {
      title: "Dietary Needs",
      key: "dietary",
      options: [
        "Low Calorie",
        "Halal",
        "Vegetarian",
        "Nut Free",
        "Gluten Free",
        "Vegan",
        "High Protein",
        "Keto",
      ],
      type: "checkbox",
    },
    {
      title: "Dining Type",
      key: "diningType",
      options: ["Solo", "Couple", "Family", "Large Group"],
      type: "checkbox",
    },
    {
      title: "Weather Preference",
      key: "weather",
      options: ["Cold", "Hot", "Rainy", "Summerlike", "Winterlike"],
      type: "checkbox",
    },
    {
      title: "Transportation",
      key: "transport",
      options: ["Bus", "Railway", "Metro", "Cab", "Bike Parking"],
      type: "checkbox",
    },
    {
      title: "Timing",
      key: "timing",
      options: ["Breakfast", "Lunch", "Dinner", "Snacks", "Brunch"],
      type: "checkbox",
    },
  ];

  const setters = {
    selectedItems: (val) => updateField("selectedItems", val),
    location: (val) => updateField("location", val),
    rating: (val) => updateField("rating", val),
    ambience: (val) => updateField("ambience", val),
    dietary: (val) => updateField("dietary", val),
    diningType: (val) => updateField("diningType", val),
    weather: (val) => updateField("weather", val),
    transport: (val) => updateField("transport", val),
    timing: (val) => updateField("timing", val),
  };

  // Helper function to safely check array filters
  const checkArrayFilter = (filterValues, dataValues) => {
    if (!filterValues || filterValues.length === 0) return true;
    if (!dataValues || dataValues.length === 0) return false;
    return filterValues.some((item) => dataValues.includes(item));
  };

  const handleApplyFilters = () => {
    console.log("--- STARTING FILTER PROCESS ---");
    console.log("Current filter state:", JSON.stringify(tempState, null, 2));
    console.log("Total restaurants:", restaurants?.length);

    const filtered = restaurants?.filter((restaurant) => {
      console.log(
        `\nChecking restaurant: ${restaurant.name || restaurant._id}`
      );

      // Location filter
      if (tempState.location && restaurant.location !== tempState.location) {
        console.log(
          `✖ Location: ${restaurant.location} ≠ ${tempState.location}`
        );
        return false;
      }

      // Cuisine filter
      if (
        tempState.selectedItems.length > 0 &&
        !checkArrayFilter(tempState.selectedItems, restaurant.cuisines)
      ) {
        console.log(`✖ Cuisine: Needs one of [${tempState.selectedItems}]`);
        return false;
      }

      // Rating filter
      if (
        tempState.rating !== null &&
        Math.floor(restaurant.averageRating || 0) < tempState.rating
      ) {
        console.log(
          `✖ Rating: ${Math.floor(restaurant.averageRating || 0)} < ${
            tempState.rating
          }`
        );
        return false;
      }

      // Ambience filter
      if (
        tempState.ambience.length > 0 &&
        !checkArrayFilter(tempState.ambience, restaurant.ambiences)
      ) {
        console.log(`✖ Ambience: Needs one of [${tempState.ambience}]`);
        return false;
      }

      // Dietary filter (using nutrients)
      if (
        tempState.dietary.length > 0 &&
        !checkArrayFilter(tempState.dietary, restaurant.nutrients)
      ) {
        console.log(`✖ Dietary: Needs one of [${tempState.dietary}]`);
        return false;
      }

      // Dining type filter (using dining)
      if (
        tempState.diningType.length > 0 &&
        !checkArrayFilter(tempState.diningType, restaurant.dining)
      ) {
        console.log(`✖ Dining: Needs one of [${tempState.diningType}]`);
        return false;
      }

      // Weather filter (using weatherPreference)
      if (
        tempState.weather.length > 0 &&
        !checkArrayFilter(tempState.weather, restaurant.weatherPreference)
      ) {
        console.log(`✖ Weather: Needs one of [${tempState.weather}]`);
        return false;
      }

      // Transport filter
      if (
        tempState.transport.length > 0 &&
        !checkArrayFilter(tempState.transport, restaurant.transport)
      ) {
        console.log(`✖ Transport: Needs one of [${tempState.transport}]`);
        return false;
      }

      // Timing filter
      if (
        tempState.timing.length > 0 &&
        !checkArrayFilter(tempState.timing, restaurant.timing)
      ) {
        console.log(`✖ Timing: Needs one of [${tempState.timing}]`);
        return false;
      }

      console.log("✅ PASSED ALL FILTERS");
      return true;
    });

    console.log("\n--- FILTERING RESULTS ---");
    console.log(`Filtered ${filtered?.length || 0} restaurants`);
    if (filtered?.length > 0) {
      console.log(
        "Sample filtered results:",
        filtered.slice(0, 3).map((r) => r.name)
      );
    }

    // Update context
    setSelectedItems(tempState.selectedItems);
    setLocation(tempState.location);
    setRating(tempState.rating);
    setAmbience(tempState.ambience);
    setDietary(tempState.dietary);
    setDiningType(tempState.diningType);
    setWeather(tempState.weather);
    setTransport(tempState.transport);
    setTiming(tempState.timing);

    setNoMatch(filtered?.length === 0);
    onHide();
  };
  const handleClearAll = () => {
    setTempState({
      selectedItems: [],
      location: null,
      rating: null,
      ambience: [],
      dietary: [],
      diningType: [],
      weather: [],
      transport: [],
      timing: [],
    });
    setNoMatch(false);
  };

  useEffect(() => {
    if (show) handleClearAll();
  }, [show]);

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Filter Restaurants</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FilterAccordion
          tempValues={tempState}
          setters={setters}
          filters={filterConfigs}
        />
        {noMatch && (
          <p className="text-danger mt-3">No restaurants match your filters.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleApplyFilters}>
          Apply Filters
        </Button>
        <Button variant="link" onClick={handleClearAll}>
          Clear All
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Filteration;
