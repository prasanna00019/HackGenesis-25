import React, { useState, useEffect } from "react";
import axios from "axios";

const Meditation = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/Meditation/getAllMeditations") // Replace with your backend API
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error("Error fetching Meditation data:", error));
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 overflow-auto max-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-yellow-700">Meditation Practices</h2>
      {data.length === 0 ? (
        <p className="text-center text-gray-600">Loading Meditation data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="text-xl font-semibold text-yellow-800">{item.title}</h3>
              <iframe
                className="w-full h-48 rounded-md mt-2"
                src={item.link}
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p className="mt-4 text-gray-600">{item.description}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-yellow-700 text-white py-2 px-4 rounded-md hover:bg-yellow-800"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Meditation;
