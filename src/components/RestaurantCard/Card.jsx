// EnhancedCard.js

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useRestaurantContext from "../Hooks/useRestaurant";
import { useEffect, useState } from "react";
import axios from "axios";
import { Heart, HeartFill, PencilSquare, Trash } from "react-bootstrap-icons";

function CardItem() {
  const { location, rating, selectedItems } = useRestaurantContext();
  const [restaurants, setRestaurants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [newReview, setNewReview] = useState({ rating: "", comment: "" });
  const [favorites, setFavorites] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", address: "" });
  console.log(selectedRestaurant);
  useEffect(() => {
    getAllRestaurants();
    fetchFavorites();
  }, [location, rating, selectedItems]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/auth/getFavorites",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data?.success) {
        const ids = response.data.data.map((item) => item._id);
        setFavorites(ids);
      }
    } catch (error) {
      console.log("Fetching favorites error", error);
    }
  };
  const getAllRestaurants = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/restaurants/filter",
        {
          location: location,
          rating: rating,
          cuisines: selectedItems,
        }
      );

      if (response.data?.success) {
        setRestaurants(response.data.data);
      } else {
        setRestaurants([]);
      }
    } catch (error) {
      console.log("error is", error);
    }
  };

  const toggleFavorite = async (restaurantId) => {
    try {
      await axios.post(
        "http://localhost:4000/api/auth/toggleFavoriteRestaurant",
        {
          restaurantId,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (favorites.includes(restaurantId)) {
        setFavorites(favorites.filter((id) => id !== restaurantId));
      } else {
        setFavorites([...favorites, restaurantId]);
      }
      alert("Favorite status toggled!");
    } catch (error) {
      console.log("Favorite error", error);
    }
  };

  const openModal = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowModal(true);
    setIsEditMode(true);
  };

  const handleReviewSubmit = async () => {
    try {
      await axios.put(
        "http://localhost:4000/api/restaurants/addReview",
        {
          restaurantId: selectedRestaurant._id,
          ...newReview,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Review added!");
      setNewReview({ rating: "", comment: "" });
      setShowModal(false);
    } catch (error) {
      console.log("Review error", error);
    }
  };
  const handleDelete = async (restaurantId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this restaurant?"
    );
    if (!confirmDelete) return;
    try {
      await axios.delete(
        `http://localhost:4000/api/restaurant/delete/${restaurantId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Restaurant deleted!");
      getAllRestaurants();
    } catch (error) {
      console.log("Delete error", error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:4000/api/restaurant/edit/${selectedRestaurant._id}`,
        editForm,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Restaurant updated!");
      setShowModal(false);
      getAllRestaurants();
    } catch (error) {
      console.log("Edit error", error);
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", marginLeft: "2vw" }}>
      {restaurants.length === 0 ? (
        <h3>No Restaurants Found!</h3>
      ) : (
        restaurants.map((item) => (
          <Card
            key={item._id}
            style={{ width: "18rem", marginLeft: "4vw", marginTop: "4vh" }}
          >
            <Card.Img
              variant="top"
              src={`http://localhost:4000${item.image}`}
              style={{ height: "20vh", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>
                Types of food we offer : {item.cuisines?.join(", ")}
              </Card.Text>
              <Button variant="primary" onClick={() => openModal(item)}>
                More Details
              </Button>{" "}
              {/* Bookmark Icon Button */}
              <Button
                variant="link"
                onClick={() => toggleFavorite(item._id)}
                style={{
                  color: favorites.includes(item._id) ? "red" : "black",
                }}
              >
                {favorites.includes(item._id) ? (
                  <HeartFill size={25} />
                ) : (
                  <Heart size={25} />
                )}
              </Button>
              {/* Edit and Delete Icons */}
              <Button variant="link" onClick={() => openModal(item, true)}>
                <PencilSquare size={20} color="blue" />
              </Button>
              <Button variant="link" onClick={() => handleDelete(item._id)}>
                <Trash size={20} color="red" />
              </Button>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Address: {item.address}</ListGroup.Item>
              <ListGroup.Item>City: {item.location}</ListGroup.Item>
              <ListGroup.Item>Rating: {item.rating}</ListGroup.Item>
              <ListGroup.Item>
                Offers: {item.offer ? "Yes" : "No"}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        ))
      )}

      {/* Modal for more details */}
      {/* Modal for details, review, or edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode ? "Edit Restaurant" : selectedRestaurant?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRestaurant && (
            <div>
              {isEditMode ? (
                <>
                  <input
                    type="text"
                    placeholder="Name"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="form-control mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={editForm.address}
                    onChange={(e) =>
                      setEditForm({ ...editForm, address: e.target.value })
                    }
                    className="form-control mb-2"
                  />
                  <Button variant="success" onClick={handleEditSubmit}>
                    Save Changes
                  </Button>
                </>
              ) : (
                <>
                  <p>
                    <strong>Address:</strong> {selectedRestaurant.address}
                  </p>
                  <p>
                    <strong>Contact:</strong> {selectedRestaurant.contact}
                  </p>
                  <p>
                    <strong>Location:</strong> {selectedRestaurant.location}
                  </p>
                  <p>
                    <strong>Offers:</strong>{" "}
                    {selectedRestaurant.offer ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Cuisines:</strong>{" "}
                    {selectedRestaurant.cuisines?.join(", ")}
                  </p>
                  <p>
                    <strong>Latitude:</strong> {selectedRestaurant.latitude}
                  </p>
                  <p>
                    <strong>Longitude:</strong> {selectedRestaurant.longitude}
                  </p>
                  <p>
                    <strong>Nutrients:</strong>{" "}
                    {selectedRestaurant.nutrients?.join(", ")}
                  </p>
                  <p>
                    <strong>Dining:</strong>{" "}
                    {selectedRestaurant.dining?.join(", ")}
                  </p>
                  <p>
                    <strong>Weather Preference:</strong>{" "}
                    {selectedRestaurant.weatherPreference?.join(", ")}
                  </p>
                  <p>
                    <strong>Timing:</strong>{" "}
                    {selectedRestaurant.timing?.join(", ")}
                  </p>
                  <p>
                    <strong>Transport:</strong>{" "}
                    {selectedRestaurant.transport?.join(", ")}
                  </p>
                  <p>
                    <strong>Rating:</strong> {selectedRestaurant.averageRating}
                  </p>
                  <hr />
                  <h5>Add Review</h5>
                  <input
                    type="number"
                    placeholder="Rating (1-5)"
                    value={newReview.rating}
                    onChange={(e) =>
                      setNewReview({ ...newReview, rating: e.target.value })
                    }
                    className="form-control mb-2"
                  />
                  <textarea
                    placeholder="Comment"
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    className="form-control mb-2"
                  ></textarea>
                  <Button variant="success" onClick={handleReviewSubmit}>
                    Submit Review
                  </Button>
                </>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CardItem;
