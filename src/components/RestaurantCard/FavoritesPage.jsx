// FavoritesPage.js
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { HeartFill } from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [newReview, setNewReview] = useState({ rating: "", comment: "" });

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/auth/getFavorites",
        {
          withCredentials: true
        }
      );

      if (response.data?.success) {
        setFavorites(response.data.data);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.log("Error fetching favorites:", error);
    }
  };
  const openModal = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowModal(true);
  };
  const toggleFavorite = async (restaurantId) => {
    try {
      await axios.post(
        "http://localhost:4000/api/auth/toggleFavoriteRestaurant",
        {
          restaurantId,
        },
        {
          withCredentials: true
        }
      );
      setFavorites(favorites.filter((item) => item._id !== restaurantId));
      alert("Favorite status toggled!");
    } catch (error) {
      console.log("Favorite error", error);
    }
  };
  const handleReviewSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/restaurants/addReview",
        {
          restaurantId: selectedRestaurant._id,
          ...newReview,
        },
        {
          withCredentials: true
        }
      );
      alert("Review added!");
      setNewReview({ rating: "", comment: "" });
      setShowModal(false);
    } catch (error) {
      console.log("Review error", error);
    }
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap", marginLeft: "2vw" }}>
      {favorites.length === 0 ? (
        <h3>No Favorites Found!</h3>
      ) : (
        favorites.map((item) => (
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
              </Card.Text>{" "}
              <Button variant="primary" onClick={() => openModal(item)}>
                More Details
              </Button>
              {/* Bookmark Icon Button */}
              <Button
                variant="link"
                onClick={() => toggleFavorite(item._id)}
                style={{ color: "red" }}
              >
                <HeartFill size={25} />
              </Button>
              {/* You can add a View Details or Remove Favorite button here */}
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
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedRestaurant?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRestaurant && (
            <div>
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
                <strong>Dining:</strong> {selectedRestaurant.dining?.join(", ")}
              </p>
              <p>
                <strong>Weather Preference:</strong>{" "}
                {selectedRestaurant.weatherPreference?.join(", ")}
              </p>
              <p>
                <strong>Timing:</strong> {selectedRestaurant.timing?.join(", ")}
              </p>
              <p>
                <strong>Transport:</strong>{" "}
                {selectedRestaurant.transport?.join(", ")}
              </p>
              <p>
                <strong>Rating:</strong> {selectedRestaurant.rating}
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
              />
              <br />
              <textarea
                placeholder="Comment"
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
              ></textarea>
              <br />
              <Button variant="success" onClick={handleReviewSubmit}>
                Submit Review
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FavoritesPage;
