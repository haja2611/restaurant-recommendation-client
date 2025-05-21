import { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
// other imports...

function CardItem() {
  // existing states...

  const [aiQuery, setAiQuery] = useState("");
  const [aiRecommendation, setAiRecommendation] = useState("");

  // function to handle AI search
  const handleAIRecommendation = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/ai/recommend",
        {
          query: aiQuery,
        }
      );

      if (response.data?.success) {
        setAiRecommendation(response.data.recommendation);
        console.log(response.data.recommendation);
      } else {
        setAiRecommendation("No recommendation found.");
      }
    } catch (error) {
      console.error("AI recommendation error", error);
      setAiRecommendation("Error fetching AI recommendation.");
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* AI Search Field */}
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter your food preference"
          value={aiQuery}
          onChange={(e) => setAiQuery(e.target.value)}
          style={{ width: "300px", padding: "8px", marginRight: "10px" }}
        />
        <Button variant="primary" onClick={handleAIRecommendation}>
          Get AI Recommendation
        </Button>
      </div>

      {/* Display AI Recommendation */}
      {aiRecommendation && (
        <div
          style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "bold" }}
        >
          {aiRecommendation}
        </div>
      )}

      {/* Your existing card rendering */}
      <div style={{ display: "flex", flexWrap: "wrap", marginLeft: "2vw" }}>
        {/* your restaurants.map() */}
      </div>

      {/* Modal Code */}
    </div>
  );
}

export default CardItem;
