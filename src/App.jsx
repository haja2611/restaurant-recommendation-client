// App.js
import style from "./App.module.css";
import "leaflet/dist/leaflet.css";

import CardItem from "./components/RestaurantCard/Card";
function App() {
  return (
    <div className="App">
      <div className={style.restaurants}>
        <h3>Restaurants</h3>
        <CardItem />
      </div>
    </div>
  );
}

export default App;
