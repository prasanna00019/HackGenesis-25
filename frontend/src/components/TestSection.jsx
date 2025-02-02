import React, { useState } from "react";
import adhd from '../assets/adhd.jpg';
import angerimg from '../assets/anger.jpg';
import depression from '../assets/depression.jpg';  
import emotionalimg from '../assets/emotional.jpg';
import socialimg from '../assets/socialanxiety.jpg';
import { useNavigate } from "react-router-dom";
const TestSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate=useNavigate();
  // Test data
  const tests = [
    {
      name: "ADHD Test",
      image: adhd,
      nav:'/home/dashboard/ADHD-mangement'
    },
    {
      name: "Anger Management Test",
      image: angerimg,
      nav:'/home/dashboard/anger-mangement'
    },
    {
      name: "Depression Test",
      image: depression,
      nav:'/home/dashboard/Depression-mangement'
    },
    {
      name: "Emotional Stability Test",
      image: emotionalimg,
      nav:'/home/dashboard/emotional-mangement'
    },
    {
      name: "Social Anxiety Test",
      image: socialimg,
      nav:'/home/dashboard/social-mangement'
    },
  ];

  // Filter tests based on search query
  const filteredTests = tests.filter((test) =>
    test.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.title}>Mental Health Tests</h1>
        <input
          type="text"
          id="search"
          placeholder="Search Test"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.search}
        />

        <div style={styles.grid}>
          {filteredTests.map((test, index) => (
            <div onClick={()=>{navigate(test.nav)}} key={index} style={styles.testCard} data-name={test.name}>
              <img src={test.image} alt={test.name} style={styles.testImage} />
              <p style={styles.testName}>{test.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  body: {
    fontFamily: "'Montserrat', sans-serif",
    
    textAlign: "center",
    margin: 0,
    padding: "20px",
  },
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "34px",
    marginBottom: "15px",
    fontWeight: "600",
    color: "#2c3e50",
    letterSpacing: "1px",
  },
  search: {
    width: "100%",
    maxWidth: "500px",
    padding: "12px",
    marginBottom: "30px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
    fontFamily: "'Montserrat', sans-serif",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "30px",
    width: "100%",
    marginTop: "20px",
  },
  testCard: {
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "15px",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  testImage: {
    width: "100%",
    height: "180px",
    objectFit: "contain",
    borderRadius: "5px",
  },
  testName: {
    fontWeight: "bold",
    marginTop: "15px",
    fontSize: "18px",
    color: "#34495e",
    transition: "color 0.3s ease",
  },
  // Media Queries
  "@media (max-width: 768px)": {
    title: {
      fontSize: "28px",
    },
    grid: {
      gridTemplateColumns: "1fr 1fr",
    },
    search: {
      fontSize: "18px",
    },
    testImage: {
      height: "160px",
    },
    testName: {
      fontSize: "16px",
    },
  },
  "@media (max-width: 480px)": {
    title: {
      fontSize: "24px",
    },
    grid: {
      gridTemplateColumns: "1fr",
    },
    search: {
      fontSize: "16px",
    },
    testImage: {
      height: "140px",
    },
    testName: {
      fontSize: "14px",
    },
  },
};

export default TestSection;