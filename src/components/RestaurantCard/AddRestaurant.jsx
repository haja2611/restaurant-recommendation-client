import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

const cuisineOptions = [
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
];

const locationOptions = [
  "Chennai",
  "Hyderabad",
  "Mumbai",
  "Delhi",
  "Banglore",
  "Pune",
];
const nutrientOptions = [
  "Low Calorie",
  "Nut Free",
  "Gluten Free",
  "Vegan",
  "High Protein",
];

const timingOptions = ["Breakfast", "Lunch", "Dinner", "Snacks", "Brunch"];

const transportOptions = ["Bus", "Railway", "Metro", "Cab", "Bike Parking"];

const weatherOptions = ["Cold", "Hot", "Rainy", "Summerlike", "Winterlike"];

const AddRestaurant = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    location: "",
    offers: false,
    cuisines: [],
    latitude: "",
    longitude: "",
    nutrients: [],
    dining: [],
    weatherPreference: [],
    timing: [],
    transport: [],
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else if (
      type === "checkbox" &&
      [
        "cuisines",
        "nutrients",
        "timing",
        "transport",
        "weatherPreference",
      ].includes(name)
    ) {
      const updated = checked
        ? [...formData[name], value]
        : formData[name].filter((item) => item !== value);
      setFormData({ ...formData, [name]: updated });
    } else if (type === "checkbox" && name === "offers") {
      setFormData({ ...formData, offers: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        (error) => {
          console.error(error);
          alert("Failed to fetch location. Allow location access.");
        }
      );
    } else {
      alert("Geolocation not supported by your browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        data.append(key, value.join(",")); // arrays as CSV
      } else {
        data.append(key, value);
      }
    });

    try {
      const res = await axios.post(
        "http://localhost:4000/api/restaurants",
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
           
          },
        }
      );
      alert("Restaurant added!");
      onHide();
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert("Error adding restaurant");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Restaurant</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Restaurant Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="e.g., Zam Zam Biryani"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="address"
              as="textarea"
              placeholder="e.g., 5th Ave, Z Block, Anna Nagar"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="text"
              name="contact"
              placeholder="Contact"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Select
              name="location"
              type="text"
              onChange={handleChange}
              required
              defaultValue=""
            >
              <option value="" disabled hidden>
                Select Location
              </option>
              {locationOptions.map((loc, idx) => (
                <option key={idx} value={loc}>
                  {loc}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Select
              type="text"
              name="rating"
              onChange={handleChange}
              required
              defaultValue=""
            >
              <option value="" disabled hidden>
                Select Rating
              </option>
              {[1, 2, 3, 4, 5].map((rate) => (
                <option key={rate} value={rate}>
                  {rate}
                </option>
              ))}
            </Form.Select>
          </Form.Group> */}
          <Form.Group className="mb-3">
            <Form.Label>Offers:</Form.Label>
            <div className="d-flex flex-wrap gap-2">
              <Form.Check
                type="checkbox"
                name="offers"
                onChange={handleChange}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cuisine Types</Form.Label>
            <div className="d-flex flex-wrap gap-2">
              {cuisineOptions.map((cuisine, idx) => (
                <Form.Check
                  key={idx}
                  type="checkbox"
                  id={`cuisine-${idx}`}
                  label={cuisine}
                  name="cuisines"
                  value={cuisine}
                  onChange={handleChange}
                />
              ))}
            </div>
          </Form.Group>
          {/* Nutrients */}
          <Form.Group className="mb-3">
            <Form.Label>Nutrient Info</Form.Label>
            <div className="d-flex flex-wrap gap-2">
              {nutrientOptions.map((item, idx) => (
                <Form.Check
                  key={idx}
                  type="checkbox"
                  label={item}
                  name="nutrients"
                  value={item}
                  onChange={handleChange}
                />
              ))}
            </div>
          </Form.Group>

          {/* Timing */}
          <Form.Group className="mb-3">
            <Form.Label>Available Timing</Form.Label>
            <div className="d-flex flex-wrap gap-2">
              {timingOptions.map((item, idx) => (
                <Form.Check
                  key={idx}
                  type="checkbox"
                  label={item}
                  name="timing"
                  value={item}
                  onChange={handleChange}
                />
              ))}
            </div>
          </Form.Group>

          {/* Transport */}
          <Form.Group className="mb-3">
            <Form.Label>Transport Facilities</Form.Label>
            <div className="d-flex flex-wrap gap-2">
              {transportOptions.map((item, idx) => (
                <Form.Check
                  key={idx}
                  type="checkbox"
                  label={item}
                  name="transport"
                  value={item}
                  onChange={handleChange}
                />
              ))}
            </div>
          </Form.Group>

          {/* Weather Preference */}
          <Form.Group className="mb-3">
            <Form.Label>Weather Preference</Form.Label>
            <div className="d-flex flex-wrap gap-2">
              {weatherOptions.map((item, idx) => (
                <Form.Check
                  key={idx}
                  type="checkbox"
                  label={item}
                  name="weatherPreference"
                  value={item}
                  onChange={handleChange}
                />
              ))}
            </div>
          </Form.Group>

          {/* Latitude Longitude */}
          <Form.Group className="mb-3">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="text"
              name="latitude"
              placeholder="Latitude"
              value={formData.latitude}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="text"
              name="longitude"
              placeholder="Longitude"
              value={formData.longitude}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="secondary" onClick={getLocation}>
            📍 Get My Location
          </Button>

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add Restaurant
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddRestaurant;
