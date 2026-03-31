import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    age: "",
    daily_screen_time: "",
    social_media_hours: "",
    study_hours: "",
    sleep_hours: "",
    notifications_per_day: "",
    focus_score: "",
    addiction_level: ""
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value)
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData
      );
      setResult(response.data.productivity_score);
    } catch (error) {
      console.error(error);
      alert("API error - check backend");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Productivity Predictor</h1>

      {Object.keys(formData).map((key) => (
        <div key={key}>
          <input
            type="number"
            name={key}
            placeholder={key}
            onChange={handleChange}
          />
        </div>
      ))}

      <button onClick={handleSubmit}>Predict</button>

      {result !== null && (
        <h2>Predicted Productivity: {result.toFixed(2)}</h2>
      )}
    </div>
  );
}

export default App;