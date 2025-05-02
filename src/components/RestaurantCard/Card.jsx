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
  const [currentUser, setCurrentUser] = useState(null); // user info with id, name

  console.log(selectedRestaurant);
  useEffect(() => {
    getAllRestaurants();
    fetchFavorites();
  }, [location, rating, selectedItems]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/user/get-user", {
        withCredentials: true, // sends the cookie
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => setCurrentUser(res?.data))
      .catch((err) => console.error(err));
  }, []);
  const fetchFavorites = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/auth/getFavorites",
        {
          withCredentials: true,
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
          withCredentials: true,
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

  const openModal = (restaurant, edit = false) => {
    setSelectedRestaurant(restaurant);
    setShowModal(true);
    setIsEditMode(edit);
    
    if (edit) {
      setEditForm({ name: restaurant.name, address: restaurant.address });
    } else {
      // Check if current user has already reviewed this restaurant
      const existingReview = restaurant.reviews?.find(
        (rev) => rev.user?._id === currentUser?._id
      );
      
      if (existingReview) {
        // Pre-fill the form with existing review
        setNewReview({
          rating: existingReview.rating,
          comment: existingReview.comment
        });
      } else {
        // Reset the form if no existing review
        setNewReview({ rating: "", comment: "" });
      }
    }
  };

  const handleReviewSubmit = async () => {
    if (!newReview.rating || !newReview.comment) {
      alert("Please provide both rating and comment");
      return;
    }
  
    try {
      await axios.post(
        "http://localhost:4000/api/restaurants/addReview",
        {
          restaurantId: selectedRestaurant._id,
          ...newReview,
        },
        {
          withCredentials: true,
        }
      );
      
      alert("Review submitted successfully!");
      setNewReview({ rating: "", comment: "" });
      setShowModal(false);
      getAllRestaurants();
    } catch (error) {
      console.log("Review error", error);
      alert("Failed to submit review: " + error.message);
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
          withCredentials: true,
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
          withCredentials: true,
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
              src={`http://localhost:4000${item?.image}`}
              style={{ height: "20vh", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>
                Types of food we offer : {item.cuisines?.join(", ")}
              </Card.Text>
              <Button variant="primary" onClick={() => openModal(item, false)}>
                More
              </Button>

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
              <ListGroup.Item>Rating: {item.averageRating}</ListGroup.Item>
              <ListGroup.Item>
                Rating:{" "}
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{
                      color:
                        star <= Math.round(item.averageRating)
                          ? "#FFD700"
                          : "#ccc",
                    }}
                  >
                    ★
                  </span>
                ))}
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

                  <h5>All Reviews</h5>
                  <div style={{ maxHeight: "250px", overflowY: "auto" }}>
                    {[...(selectedRestaurant.reviews || [])]
                      .sort((a) => (a.user?._id === currentUser?._id ? -1 : 1))
                      .map((rev) => (
                        <div
                          key={rev._id}
                          style={{
                            marginBottom: "1rem",
                            padding: "0.5rem",
                            borderBottom: "1px solid #ccc",
                          }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              src={
                                rev.user?.avatar
                                  ? `http://localhost:4000${rev.user?.avatar}`
                                  : "/user.png"
                              }
                              alt="DP"
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                marginRight: "10px",
                              }}
                            />
                            <strong>{rev.user?.name || "Anonymous"}</strong>
                          </div>
                          <div>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                style={{
                                  color:
                                    star <= rev.rating ? "#FFD700" : "#ccc",
                                  fontSize: "1.2rem",
                                }}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <p>{rev.comment}</p>
                        </div>
                      ))}
                  </div>

                  <h5>Add Review</h5>
                  <div className="mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() =>
                          setNewReview({ ...newReview, rating: star })
                        }
                        style={{
                          cursor: "pointer",
                          color: star <= newReview.rating ? "#FFD700" : "#ccc",
                          fontSize: "1.5rem",
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
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
