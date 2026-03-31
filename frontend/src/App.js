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
  <div style={styles.container}>
    <h1 style={styles.title}>🧠 Productivity Predictor</h1>

    <div style={styles.card}>
      {Object.keys(formData).map((key) => (
        <div style={styles.inputGroup} key={key}>
          <label style={styles.label}>{key.replaceAll("_", " ")}</label>
          <input
            type="number"
            name={key}
            placeholder={`Enter ${key}`}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      ))}

      <button style={styles.button} onClick={handleSubmit}>
        Predict
      </button>

      {result !== null && (
        <div style={styles.result}>
          <h2>Score: {result.toFixed(2)}</h2>
          <p>
            {result > 70
              ? "🚀 High Productivity"
              : result > 40
              ? "🙂 Moderate"
              : "😴 Low Productivity"}
          </p>
        </div>
      )}
    </div>
  </div>
  );
}

const styles = {
  container: {
    background: "#f4f6f8",
    minHeight: "100vh",
    padding: "30px",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    width: "350px",
    margin: "auto",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  inputGroup: {
    marginBottom: "10px",
    textAlign: "left",
  },
  label: {
    fontSize: "14px",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    marginTop: "15px",
    padding: "10px",
    width: "100%",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  result: {
    marginTop: "20px",
    padding: "10px",
    background: "#eaf7ea",
    borderRadius: "8px",
  },
};

export default App;