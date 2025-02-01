import React, { useState, useEffect } from "react";
import axios from "axios";

const Meditation = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state

  // Fetch all Meditation data initially
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/Meditation/getAllMeditations")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error("Error fetching Meditation data:", error));
  }, []);

  const handleSearch = () => {
    if (!query.trim()) {
      // Reload all data when query is empty
      axios
        .get("http://localhost:5000/api/Meditation/getAllMeditations")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching Meditation data:", error);
        });
      return;
    }

    setLoading(true); // Start loading animation
    axios
      .post("http://localhost:8000/meditation/recommend", { user_query: query })
      .then((response) => {
        const recommendations = Array.isArray(response.data)
          ? response.data.slice(0, 3)
          : [response.data];
        setData(recommendations);
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
        setData([]);
      })
      .finally(() => setLoading(false)); // End loading animation
  };

  return (
    <div className="container mx-auto px-4 py-6 overflow-auto max-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-yellow-700">
        Meditation Practices
      </h2>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your condition, e.g., stress relief..."
          className="border border-gray-400 rounded-md px-4 py-2 w-2/3"
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-700 text-white ml-4 px-4 py-2 rounded-md hover:bg-yellow-800"
        >
          {loading ? (
            <span className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Loading...</span>
            </span>
          ) : (
            "QUERY"
          )}
        </button>
      </div>

      {data.length === 0 && !loading ? (
        <p className="text-center text-gray-600">
          No results found or loading Meditation data...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="text-xl font-semibold text-yellow-800">
                {item.title}
              </h3>
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
