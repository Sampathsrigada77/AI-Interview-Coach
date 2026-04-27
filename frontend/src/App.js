import { useState } from "react";
import axios from "axios";

function App() {
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Get Question
  const getQuestion = async () => {
  setLoading(true);
  try {
    const res = await axios.get(
      `http://localhost:5000/question?topic=${topic}`
    );
    setQuestion(res.data.question);
    setResult("");
  } catch (err) {
    console.error(err);
  }
  setLoading(false);
};

  // Evaluate Answer
  const evaluateAnswer = async () => {
  setLoading(true);
  try {
    const res = await axios.post(
      "http://localhost:5000/evaluate",
      {
        question,
        answer,
      }
    );
    setResult(res.data.result);
  } catch (err) {
    console.error(err);
  }
  setLoading(false);
};
  const resetAll = () => {
  setTopic("");
  setQuestion("");
  setAnswer("");
  setResult("");
  };

    return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #667eea, #764ba2)"
    }}>
      
      <div style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "15px",
        width: "400px",
        textAlign: "center",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
      }}>
        
        <h2 style={{ marginBottom: "20px" }}> AI Interview Coach</h2>

        <input
          type="text"
          placeholder="Enter your question/topic (eg: DSA)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "10px"
          }}
        />

        <button
          onClick={getQuestion}
          style={{
            padding: "10px",
            width: "100%",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#667eea",
            color: "white",
            cursor: "pointer"
          }}
        >
          Get Question
        </button>

        <button
          onClick={resetAll}
          style={{
            padding: "10px",
            width: "100%",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#e53e3e",
            color: "white",
            marginTop: "10px",
            cursor: "pointer"
          }}
        >
          Reset
        </button>

        {loading && (
          <p style={{ color: "blue", marginTop: "10px" }}>
            ⏳ Loading...
          </p>
        )}

        <p style={{
          marginTop: "20px",
          fontWeight: "bold",
          color: "#333"
        }}>
          {question}
        </p>

        {question && (
          <>
            <textarea
              placeholder="Write your answer..."
              rows="4"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginTop: "10px"
              }}
            />

            <button
              onClick={evaluateAnswer}
              style={{
                marginTop: "10px",
                padding: "10px",
                width: "100%",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#38a169",
                color: "white",
                cursor: "pointer"
              }}
            >
              Submit Answer
            </button>
          </>
        )}

        <p style={{
          marginTop: "15px",
          color: "#2f855a",
          fontWeight: "bold"
        }}>
          {result}
        </p>

      </div>
    </div>
  );
}

export default App;