import React from "react";
import { useNavigate } from "react-router-dom";
import emotionalstability from '../assets/emotional.jpg';
const EmotionalStabilityIntermediate = () => {  
    const navigate=useNavigate();
    const handleStartButtonClick = () => {
     navigate('/home/dashboard/emotional-mangement/Test')
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        {/* Header Section */}
        <header>
          <h1 style={styles.header}>Depression Test</h1>
          <img
            src={emotionalstability}
            alt="Emotional Stability Test"
            style={styles.depressionImage}
          />
        </header>

        {/* Introduction Section */}
        <main>
          <section style={styles.intro}>
            <p style={styles.introText}>
              Feeling overwhelming sadness? Take our online emotional stability test—it's
              free, quick, and confidential.
            </p>
            <p style={styles.introStrongText}>
              <strong>20 Questions | 10 Minutes</strong>
            </p>
            <button
              id="startButton"
              style={styles.button}
              onClick={handleStartButtonClick}
            >
              Get Started!
            </button>
          </section>
        </main>
      </div>
    </div>
  );
};

// Styles
const styles = {
  body: {
    fontFamily: "'Montserrat', sans-serif",
    background: "linear-gradient(to bottom, #e8f4fa, #d1eaf5)",
    color: "#333",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "20px",
  },
  container: {
    textAlign: "center",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    width: "100%",
    animation: "fadeIn 0.8s ease-in-out",
  },
  header: {
    fontSize: "2.5rem",
    color: "#005f73",
    marginBottom: "15px",
    letterSpacing: "1.2px",
  },
  depressionImage: {
    width: "100%",
    maxWidth: "320px",
    height: "auto",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
  },
  intro: {
    marginBottom: "15px",
  },
  introText: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    marginBottom: "15px",
    color: "#444",
  },
  introStrongText: {
    fontSize: "1.2rem",
    color: "#007f7f",
  },
  button: {
    background: "#008CBA",
    color: "white",
    border: "none",
    padding: "12px 30px",
    fontSize: "1.2rem",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s ease, transform 0.3s ease",
  },
  "@media (max-width: 768px)": {
    header: {
      fontSize: "2rem",
    },
    container: {
      padding: "25px",
    },
    introText: {
      fontSize: "1rem",
    },
    button: {
      fontSize: "1rem",
      padding: "10px 25px",
    },
  },
  "@media (max-width: 480px)": {
    header: {
      fontSize: "1.8rem",
    },
    introText: {
      fontSize: "0.95rem",
    },
    button: {
      fontSize: "0.9rem",
      padding: "10px 20px",
    },
  },
};

export default EmotionalStabilityIntermediate;