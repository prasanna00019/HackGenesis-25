import React, { useState, useEffect } from "react";
import axios from "axios";

const Chants = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/Chants/getAllChants") // Replace with your backend API
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error("Error fetching Chants data:", error));
  }, []);

  const trimDescription = (description, maxLength = 100) => {
    return description.length > maxLength
      ? description.slice(0, maxLength) + "..."
      : description;
  };
  console.log(data)
  return (
    <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 min-h-screen">
      <h2 className="text-3xl font-bold text-yellow-900 mb-4">Divine Chants</h2>
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
       
        {data.length === 0 ? (
          <p>Loading Chants...</p>
        ) : (
          data.map((item, index) => (
            <li
              key={index}
              className="bg-white shadow-xl rounded-2xl p-4 border border-yellow-300"
            >
              <h3 className="text-xl font-semibold text-yellow-800">
                {item.title}
              </h3>
              <p className="text-sm text-yellow-700 my-2">
                {trimDescription(item.description || "", 120)}
              </p>
              <audio
                className="w-full mt-2"
                controls
                src={item.link}
              >
                Your browser does not support the audio element.
              </audio>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Chants;
