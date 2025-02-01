import React, { useState } from "react";

const AffirmationGame = () => {
  const words = [
    "I am", "strong", "worthy", "capable", "loved", "grateful", "calm", "confident", "happy", "brave",
  ];

  const [affirmationWords, setAffirmationWords] = useState([]);
  const [affirmationsBuilt, setAffirmationsBuilt] = useState(0);
  const [filter, setFilter] = useState("");

  const addToAffirmation = (word) => {
    setAffirmationWords((prev) => [...prev, word]);
    if (affirmationWords.length + 1 >= 3) {
      celebrateAffirmation();
    }
  };

  const celebrateAffirmation = () => {
    setAffirmationsBuilt((prev) => prev + 1);
    alert("Great job! You built a positive affirmation!");
    setAffirmationWords([]);
  };

  const copyAffirmation = () => {
    const text = affirmationWords.join(" ");
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Affirmation copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const restartGame = () => {
    setAffirmationWords([]);
    setAffirmationsBuilt(0);
  };

  const filteredWords = words.filter((word) =>
    word.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.h1}>Positive Affirmation Builder</h1>
        <div style={styles.progress}>
          <span>Affirmations Built: {affirmationsBuilt}</span>
        </div>
        <div style={styles.wordBank}>
          <h2>Choose Your Words</h2>
          <input
            type="text"
            placeholder="Type to find words..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={styles.wordInput}
          />
          <div style={styles.words}>
            {filteredWords.map((word, index) => (
              <div
                key={index}
                style={styles.word}
                onClick={() => addToAffirmation(word)}
              >
                {word}
              </div>
            ))}
          </div>
        </div>
        <div style={styles.affirmationDisplay}>
          <h2>Your Affirmation</h2>
          <div style={styles.affirmation}>
            {affirmationWords.map((word, index) => (
              <span key={index} style={styles.wordAdded}>
                {word}
              </span>
            ))}
          </div>
          <div style={styles.buttons}>
            <button style={styles.button} onClick={copyAffirmation}>
              Copy Affirmation
            </button>
            <button style={styles.button} onClick={restartGame}>
              Restart Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f3f4f6",
    color: "#333",
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "20px",
    boxSizing: "border-box",
  },
  container: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "500px",
    textAlign: "center",
  },
  h1: {
    color: "#111",
    marginBottom: "16px",
    fontSize: "1.8em",
  },
  progress: {
    marginBottom: "20px",
    fontSize: "1em",
    color: "#555",
  },
  wordInput: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "16px",
    fontSize: "1em",
  },
  words: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  word: {
    backgroundColor: "#0078d4",
    color: "white",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
    userSelect: "none",
  },
  wordAdded: {
    backgroundColor: "#e0f7fa",
    color: "#0078d4",
    padding: "8px",
    borderRadius: "8px",
  },
  affirmationDisplay: {
    margin: "20px 0",
  },
  affirmation: {
    padding: "16px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    fontSize: "1.1em",
    minHeight: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "8px",
    boxShadow: "inset 0 2px 6px rgba(0, 0, 0, 0.05)",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  },
  button: {
    backgroundColor: "#0078d4",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    fontSize: "1em",
  },
};

export default AffirmationGame;
