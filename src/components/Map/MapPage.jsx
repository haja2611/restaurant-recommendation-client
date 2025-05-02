import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import axios from "axios";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Default marker fix (optional but recommended)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
// Create a custom icon for user location
const userLocationIcon = new L.Icon({
  iconUrl:
    "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png", // Different icon
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
function MapPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [userLocation, setUserLocation] = useState(null); // Default center
  console.log(restaurants);
  useEffect(() => {
    fetchRestaurants();
    getUserLocation();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/restaurants/all"
      ); // Change to your API
      if (response.data?.success) {
        setRestaurants(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch restaurants", error);
    }
  };
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("User location error", error);
        }
      );
    }
  };
  if (!userLocation) {
    // Still loading user's location
    return <div>Loading map...</div>;
  }
  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <MapContainer
        center={userLocation}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={userLocation} icon={userLocationIcon}>
          <Popup>Your Location</Popup>
        </Marker>

        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant._id}
            position={[restaurant.latitude, restaurant.longitude]}
          >
            <Popup>
              <strong>{restaurant.name}</strong>
              <br />
              {restaurant.address}
              <br />
              Rating: {restaurant.rating}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapPage;
