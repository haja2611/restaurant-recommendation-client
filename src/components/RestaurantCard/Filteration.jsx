// import { useEffect, useState } from "react";
// import { Modal, Button, Form, Row, Col, Accordion } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import useRestaurantContext from "../Hooks/useRestaurant";

// const Filteration = ({ show, onHide }) => {
//   const {
//     setSelectedItems,
//     setLocation,
//     setRating,
//     setAmbience,
//     setDietary,
//     setDiningType,
//     setWeather,
//     setTransport,
//     setTiming,
//   } =
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     useRestaurantContext();
//   // Temporary state while modal is open
//   const [tempSelectedItems, setTempSelectedItems] = useState([]);
//   const [tempLocation, setTempLocation] = useState(null);
//   const [tempRating, setTempRating] = useState(null);
//   const [tempAmbience, setTempAmbience] = useState([]);
//   const [tempDietary, setTempDietary] = useState([]);
//   const [tempDiningType, setTempDiningType] = useState([]);
//   const [tempWeather, setTempWeather] = useState([]);
//   const [tempTransport, setTempTransport] = useState([]);
//   const [tempTiming, setTempTiming] = useState([]);
//   // Filter options
//   const locations = [
//     "Chennai",
//     "Hyderabad",
//     "Mumbai",
//     "Delhi",
//     "Banglore",
//     "Pune",
//     "Kerala",
//   ];
//   const cuisines = [
//     "North Indian",
//     "South Indian",
//     "Italian",
//     "Chinese",
//     "Mexican",
//     "Pastas",
//     "Pizzas",
//     "Barbecue",
//     "Seafood",
//     "Desserts",
//   ];
//   // const priceRanges = ["₹150", "$$", "$$$", "$$$$"];
//   const timingOptions = ["Breakfast", "Lunch", "Dinner", "Snacks", "Brunch"];

//   const transportOptions = ["Bus", "Railway", "Metro", "Cab", "Bike Parking"];
//   const ambiences = ["Casual", "Fine Dining", "Cafe", "Pub", "Family-Friendly"];
//   const dietary = [
//     "Low Calorie",
//     "Halal",
//     "Vegetarian",
//     "Nut Free",
//     "Gluten Free",
//     "Vegan",
//     "High Protein",
//     "Keto",
//   ];
//   const diningTypes = ["Solo", "Couple", "Family", "Large Group"];
//   const weatherPrefs = ["Cold", "Hot", "Rainy", "Summerlike", "Winterlike"];
//   const ratings = [1, 2, 3, 4, 5];

//   const handleCheckboxChange = (value, state, setState) => {
//     if (state.includes(value)) {
//       setState(state.filter((item) => item !== value));
//     } else {
//       setState([...state, value]);
//     }
//   };

//   const handleApplyFilters = () => {
//     setSelectedItems(tempSelectedItems);
//     setLocation(tempLocation);
//     setRating(tempRating);
//     setAmbience(tempAmbience);
//     setDietary(tempDietary);
//     setDiningType(tempDiningType);
//     setWeather(tempWeather);
//     setTransport(tempTransport);
//     setTiming(tempTiming);
//     onHide(); // Close modal
//   };

//   const handleClearAll = () => {
//     setTempSelectedItems([]);
//     setTempLocation(null);
//     setTempRating(null);
//     setTempAmbience([]);
//     setTempDietary([]);
//     setTempDiningType([]);
//     setTempWeather([]);
//     setTempTransport([]);
//     setTempTiming([]);
//   };

//   // Reset local state on modal open
//   useEffect(() => {
//     if (show) {
//       handleClearAll();
//     }
//   }, [show]);
//   return (
//     <Modal show={show} onHide={onHide} size="lg">
//       <Modal.Header closeButton>
//         <Modal.Title>Filter Restaurants</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Accordion defaultActiveKey={["0"]} alwaysOpen>
//           {/* Location Filter */}
//           <Accordion.Item eventKey="0">
//             <Accordion.Header>Location</Accordion.Header>
//             <Accordion.Body>
//               <Row>
//                 {locations.map((location, index) => (
//                   <Col key={index} xs={6} md={4}>
//                     <Form.Check
//                       type="checkbox"
//                       id={`location-${index}`}
//                       label={location}
//                       checked={tempLocation === location}
//                       onChange={() => setTempLocation(location)}
//                     />
//                   </Col>
//                 ))}
//               </Row>
//             </Accordion.Body>
//           </Accordion.Item>

//           {/* Cuisine Filter */}
//           <Accordion.Item eventKey="1">
//             <Accordion.Header>Cuisine</Accordion.Header>
//             <Accordion.Body>
//               <Row>
//                 {cuisines.map((cuisine, index) => (
//                   <Col key={index} xs={6} md={4}>
//                     <Form.Check
//                       type="checkbox"
//                       // id={`cuisine-${index}`}
//                       label={cuisine}
//                       checked={tempSelectedItems.includes(cuisine)}
//                       onChange={() =>
//                         handleCheckboxChange(
//                           cuisine,
//                           tempSelectedItems,
//                           setTempSelectedItems
//                         )
//                       }
//                     />
//                   </Col>
//                 ))}
//               </Row>
//             </Accordion.Body>
//           </Accordion.Item>
//           {/* Ratings*/}
//           <Accordion.Item eventKey="2">
//             <Accordion.Header>Ratings</Accordion.Header>
//             <Accordion.Body>
//               <Row>
//                 {ratings.map((rating, index) => (
//                   <Col key={index} xs={6} md={3}>
//                     <Form.Check
//                       type="radio"
//                       name="ratings"
//                       // id={`rating-${index}`}
//                       label={rating}
//                       checked={tempRating === rating}
//                       onChange={() => setTempRating(rating)}
//                     />
//                   </Col>
//                 ))}
//               </Row>
//             </Accordion.Body>
//           </Accordion.Item>
//           {/* Ambience */}
//           <Accordion.Item eventKey="3">
//             <Accordion.Header>Ambience</Accordion.Header>
//             <Accordion.Body>
//               <Row>
//                 {ambiences.map((ambience, index) => (
//                   <Col key={index} xs={6} md={4}>
//                     <Form.Check
//                       type="checkbox"
//                       // id={`ambience-${index}`}
//                       label={ambience}
//                       checked={tempAmbience.includes(ambience)}
//                       onChange={() =>
//                         handleCheckboxChange(
//                           ambience,
//                           tempAmbience,
//                           setTempAmbience
//                         )
//                       }
//                     />
//                   </Col>
//                 ))}
//               </Row>
//             </Accordion.Body>
//           </Accordion.Item>

//           {/* Dietary */}
//           <Accordion.Item eventKey="4">
//             <Accordion.Header>Dietary Preferences</Accordion.Header>
//             <Accordion.Body>
//               <Row>
//                 {dietary.map((diet, index) => (
//                   <Col key={index} xs={6} md={4}>
//                     <Form.Check
//                       type="checkbox"
//                       // id={`diet-${index}`}
//                       label={diet}
//                       checked={tempDietary.includes(diet)}
//                       onChange={() =>
//                         handleCheckboxChange(diet, tempDietary, setTempDietary)
//                       }
//                     />
//                   </Col>
//                 ))}
//               </Row>
//             </Accordion.Body>
//           </Accordion.Item>

//           {/* Dining Type */}
//           <Accordion.Item eventKey="5">
//             <Accordion.Header>Dining Type</Accordion.Header>
//             <Accordion.Body>
//               <Row>
//                 {diningTypes.map((type, index) => (
//                   <Col key={index} xs={6} md={4}>
//                     <Form.Check
//                       type="checkbox"
//                       // id={`dining-${index}`}
//                       label={type}
//                       checked={tempDiningType.includes(type)}
//                       onChange={() =>
//                         handleCheckboxChange(
//                           type,
//                           tempDiningType,
//                           setTempDiningType
//                         )
//                       }
//                     />
//                   </Col>
//                 ))}
//               </Row>
//             </Accordion.Body>
//           </Accordion.Item>

//           {/* Weather Preference */}
//           <Accordion.Item eventKey="6">
//             <Accordion.Header>Weather Preference</Accordion.Header>
//             <Accordion.Body>
//               <Row>
//                 {weatherPrefs.map((weather, index) => (
//                   <Col key={index} xs={6} md={4}>
//                     <Form.Check
//                       type="checkbox"
//                       //  id={`weather-${index}`}
//                       label={weather}
//                       checked={tempWeather.includes(weather)}
//                       onChange={() =>
//                         handleCheckboxChange(
//                           weather,
//                           tempWeather,
//                           setTempWeather
//                         )
//                       }
//                     />
//                   </Col>
//                 ))}
//               </Row>
//             </Accordion.Body>
//           </Accordion.Item>
//           <Accordion.Item eventKey="7">
//             <Accordion.Header>Transportation Available</Accordion.Header>
//             <Accordion.Body>
//               <Row>
//                 {transportOptions.map((transport, index) => (
//                   <Col key={index} xs={6} md={4}>
//                     <Form.Check
//                       type="checkbox"
//                       // id={`transport-${index}`}
//                       label={transport}
//                       checked={tempTransport.includes(transport)}
//                       onChange={() =>
//                         handleCheckboxChange(
//                           transport,
//                           tempTransport,
//                           setTempTransport
//                         )
//                       }
//                     />
//                   </Col>
//                 ))}
//               </Row>
//             </Accordion.Body>
//           </Accordion.Item>
//           <Accordion.Item eventKey="8">
//             <Accordion.Header>Timining</Accordion.Header>
//             <Accordion.Body>
//               <Row>
//                 {timingOptions.map((timing, index) => (
//                   <Col key={index} xs={6} md={4}>
//                     <Form.Check
//                       type="checkbox"
//                       //id={`timing-${index}`}
//                       label={timing}
//                       checked={tempTiming.includes(timing)}
//                       onChange={() =>
//                         handleCheckboxChange(timing, tempTiming, setTempTiming)
//                       }
//                     />
//                   </Col>
//                 ))}
//               </Row>
//             </Accordion.Body>
//           </Accordion.Item>
//         </Accordion>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="outline-secondary" onClick={onHide}>
//           Cancel
//         </Button>
//         <Button variant="primary" onClick={handleApplyFilters}>
//           Apply Filters
//         </Button>
//         <Button variant="link" onClick={handleClearAll}>
//           Clear All
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default Filteration;
