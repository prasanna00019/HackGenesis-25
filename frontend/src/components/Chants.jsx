import React, { useState, useEffect } from "react";
import axios from "axios";

const Chants = () => {
  const [data, setData] = useState([]); // Stores all chants data
  const [filteredData, setFilteredData] = useState([]); // Stores filtered chants data
  const [query, setQuery] = useState(""); // Stores user query
  const [loading, setLoading] = useState(false); // Loading state for API call

  // Fetch all chants on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/Chants/getAllChants") // Replace with your backend API
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data); // Initialize filtered data with all chants
      })
      .catch((error) => console.error("Error fetching Chants data:", error));
  }, []);

  // Handle search query submission
  const handleSearch = async () => {
    if (!query.trim()) {
      setFilteredData(data); // If query is empty, show all chants
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/chants/recommend", {
        user_query: query,
      });
      setFilteredData(response.data); // Update filtered data with API response
    } catch (error) {
      console.error("Error fetching recommended chants:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset to all chants when query is cleared
  useEffect(() => {
    if (!query.trim()) {
      setFilteredData(data);
    }
  }, [query, data]);

  // Trim description for display
  const trimDescription = (description, maxLength = 100) => {
    return description.length > maxLength
      ? description.slice(0, maxLength) + "..."
      : description;
  };

  return (
    <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 min-h-screen">
      <h2 className="text-3xl font-bold text-yellow-900 mb-4">Divine Chants</h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Recommend chants..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border  border-yellow-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-2 bg-yellow-500 text-white rounded-r-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          {loading ? "Recommending..." : "QUERY"}
        </button>
      </div>

      {/* Display Chants */}
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.length === 0 ? (
          <p className="text-center text-yellow-700">No chants found.</p>
        ) : (
          filteredData.map((item, index) => (
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