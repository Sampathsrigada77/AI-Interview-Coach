const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Route to get question from FastAPI
app.get("/question", async (req, res) => {
  const topic = req.query.topic;

  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/question?topic=${topic}`
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error fetching question" });
  }
});

app.post("/evaluate", async (req, res) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/evaluate",
      req.body
    );
    
    res.json(response.data);
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Evaluation failed" });
  }
});
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});