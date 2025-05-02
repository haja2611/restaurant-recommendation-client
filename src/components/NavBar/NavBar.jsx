import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Image, Modal, Button } from "react-bootstrap";
import { Map, Heart, Plus, Filter } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import AddRestaurant from "../RestaurantCard/AddRestaurant";
import Filteration from "../RestaurantCard/Filteration";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash, BoxArrowRight } from "react-bootstrap-icons";
import axios from "axios";

const NavBar = () => {
  // State for modals
  const [showAddRestaurantModal, setShowAddRestaurantModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const navigate = useNavigate();
  // Inside NavBar component
  const [showUserModal, setShowUserModal] = useState(false);
  const [userData, setUserData] = useState({ avatar: null });
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/user/get-user", {
        withCredentials: true, // sends the cookie
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => setUserData(res.data))
      .catch((err) => console.error(err));
  }, []);
  console.log(userData);
  // Image upload handler
  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/update-avatar",
        formData,

        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // Important for file upload
          },
        }
      );
      setUserData(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
    }
  };

  // Remove image
  const handleRemoveImage = async () => {
    try {
      const res = await axios.delete(
        "http://localhost:4000/api/user/remove-avatar",
        {
          withCredentials: true,
        },
        {
          avatar: "",
        }
      );
      setUserData(res.data);
    } catch (err) {
      console.error("Remove failed:", err);
    }
  };
  // Logout handler

  const handleLogout = async () => {
    await fetch("http://localhost:4000/api/user/logout", {
      method: "POST",
      credentials: "include",
    });
    setShowUserModal(false);

    navigate("/");
  };

  // Sample data
  // const user = {
  //   name: "User Profile",
  //   avatar: null,
  // };

  useEffect(() => {
    const initGoogleTranslate = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,es,fr,de,hi,ta",
            layout:
              window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
          },
          "google_translate_element"
        );

        // Force hide any remaining Google elements
        setTimeout(() => {
          const frames = document.querySelectorAll(
            ".goog-te-banner-frame, .goog-te-gadget-simple"
          );
          frames.forEach((frame) => (frame.style.display = "none"));

          const googleTexts = document.querySelectorAll(".goog-te-menu-value");
          googleTexts.forEach((text) => (text.style.display = "none"));
        }, 100);
      }
    };

    // Check if already loaded
    if (window.google && window.google.translate) {
      initGoogleTranslate();
      return;
    }

    // Load the script
    const scriptId = "google-translate-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    window.googleTranslateElementInit = initGoogleTranslate;

    return () => {
      const script = document.getElementById(scriptId);
      if (script) document.body.removeChild(script);
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow-sm sticky-top">
        <Container fluid>
          {/* Logo */}
          <Navbar.Brand href="/Home" className="d-flex align-items-center">
            <span className="fw-bold text-primary">Restaurant Finder</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="w-100 d-flex justify-content-between">
              <div className="d-flex">
                {/* Show Map */}
                <Nav.Link
                  href="/map-view"
                  className="d-flex align-items-center me-3"
                >
                  <Map className="me-1" /> Show Map
                </Nav.Link>
                <Nav.Link
                  href="/AI-recommendation"
                  className="d-flex align-items-center me-3"
                >
                  AI Recommedation
                </Nav.Link>
                {/* Add Restaurant */}
                <Nav.Link
                  onClick={() => setShowAddRestaurantModal(true)}
                  className="d-flex align-items-center me-3"
                >
                  <Plus className="me-1" /> Add Restaurant
                </Nav.Link>

                {/* Favorites */}
                <Nav.Link
                  onClick={() => {
                    navigate("/favorites");
                  }}
                  className="d-flex align-items-center me-3"
                >
                  <Heart className="me-1" /> Favorites
                </Nav.Link>
              </div>

              <div className="d-flex align-items-center">
                {/* Filter Button */}
                <Button
                  variant="outline-primary"
                  className="me-3 d-flex align-items-center"
                  onClick={() => setShowFilterModal(true)}
                >
                  <Filter className="me-1" /> Filters
                </Button>

                <Button
                  variant="outline-primary"
                  className="btn-md"
                  id="google_translate_element"
                ></Button>

                {/* User Profile */}
                <Nav.Link
                  className="d-flex align-items-center"
                  onClick={() => setShowUserModal(true)}
                >
                  <Image
                    src={
                      userData?.avatar
                        ? `http://localhost:4000${userData.avatar}`
                        : "/user.png"
                    }
                    roundedCircle
                    width="30"
                    height="30"
                    className="me-1"
                    alt="User profile"
                  />
                  {/* {userData?.name} */}
                </Nav.Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Filter Modal */}
      <Filteration
        show={showFilterModal}
        onHide={() => setShowFilterModal(false)}
      />

      {/* Add Restaurant Modal */}
      <AddRestaurant
        show={showAddRestaurantModal}
        onHide={() => setShowAddRestaurantModal(false)}
      />
      <Modal
        show={showUserModal}
        onHide={() => setShowUserModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-3">
            <Image
              src={
                userData?.avatar
                  ? `http://localhost:4000${userData.avatar}`
                  : "/user.png"
              }
              roundedCircle
              width="100"
              height="100"
            />
            <h5 className="mt-3">{userData?.name}</h5>
          </div>
          <div className="d-flex justify-content-center gap-3">
            <label className="btn btn-outline-primary">
              <Pencil /> Update
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
            <Button variant="outline-danger" onClick={handleRemoveImage}>
              <Trash /> Remove
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUserModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            <BoxArrowRight /> Logout
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Favorites Modal */}
      {/* <Modal
        show={showFavoritesModal}
        onHide={() => setShowFavoritesModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Your Favorite Restaurants</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="list-group">
            <div className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h6>Zam Zam Biryani</h6>
                <small className="text-muted">Chennai</small>
              </div>
              <Button variant="outline-danger" size="sm">
                Remove
              </Button>
            </div>
            <div className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h6>Toscanoi</h6>
                <small className="text-muted">Bangalore</small>
              </div>
              <Button variant="outline-danger" size="sm">
                Remove
              </Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowFavoritesModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default NavBar;
