import React, { useState } from "react";
import axios from "axios";

const cuisineOptions = [
  "North Indian",
  "South Indian",
  "Chinese",
  "Desserts",
  "Italian",
  "Oriental",
  "Pastas",
  "Pizzas",
  "Japanese",
  "Sushi",
  "Barbecue",
  "Steak",
  "Seafood",
];

const locationOptions = [
  "Hyderabad",
  "Banglore",
  "Mumbai",
  "Delhi",
  "Pune",
  "Chennai",
];

const AddRestaurant = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    location: "",
    rating: "",
    offers: false,
    cuisines: [],
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else if (type === "checkbox" && name === "offers") {
      setFormData({ ...formData, offers: checked });
    } else if (type === "checkbox" && name === "cuisines") {
      const newCuisines = checked
        ? [...formData.cuisines, value]
        : formData.cuisines.filter((cuisine) => cuisine !== value);
      setFormData({ ...formData, cuisines: newCuisines });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "cuisines") {
        data.append(key, value.join(",")); // convert array to comma-separated string
      } else {
        data.append(key, value);
      }
    });

    try {
      const res = await axios.post(
        "http://localhost:4000/api/restaurants",
        data
      );
      alert("Restaurant added!");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert("Error adding restaurant");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="contact"
        placeholder="Contact"
        onChange={handleChange}
        required
      />

      <select name="location" onChange={handleChange} required>
        <option hidden>Select Location</option>
        {locationOptions.map((loc, idx) => (
          <option key={idx} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      <select name="rating" onChange={handleChange} required>
        <option hidden>Select Rating</option>
        {[1, 2, 3, 4, 5].map((rate) => (
          <option key={rate} value={rate}>
            {rate}
          </option>
        ))}
      </select>

      <label>
        Offers:
        <input type="checkbox" name="offers" onChange={handleChange} />
      </label>

      <fieldset>
        <legend>Select Cuisines:</legend>
        {cuisineOptions.map((cuisine, idx) => (
          <label key={idx} style={{ display: "block" }}>
            <input
              type="checkbox"
              name="cuisines"
              value={cuisine}
              onChange={handleChange}
            />
            {cuisine}
          </label>
        ))}
      </fieldset>

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        required
      />
      <button type="submit">Add Restaurant</button>
    </form>
  );
};

export default AddRestaurant;
