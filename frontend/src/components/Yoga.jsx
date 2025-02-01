import React, { useState, useEffect } from "react";
import axios from "axios";

const Yoga = () => {
  const [data, setData] = useState([]);
  const [expandedCards, setExpandedCards] = useState({});
  const [query, setQuery] = useState(""); // Track user query
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch all Yoga data initially or when query is empty
  useEffect(() => {
    if (query.trim() === "") {
      axios
        .get("http://localhost:5000/api/Yoga/get-all-yoga")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => console.error("Error fetching Yoga data:", error));
    }
  }, [query]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/Yoga/get-all-yoga")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error("Error fetching Yoga data:", error));
  }, []);

  const handleSearch = () => {
    if (!query.trim()) {
      // Reload all data when query is empty
      setLoading(true);
      axios
        .get("http://localhost:5000/api/Yoga/get-all-yoga")
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching all Yoga data:", error);
          setLoading(false);
        });
      return;
    }

    // Fetch filtered data using POST request
    setLoading(true);
    axios
      .post("http://localhost:8000/yoga/recommend", { user_query: query })
      .then((response) => {
        const recommendations = Array.isArray(response.data)
          ? response.data.slice(0, 3)
          : [response.data];
        setData(recommendations);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
        setData([]);
        setLoading(false);
      });
  };

  const toggleExpand = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="container mx-auto px-4 py-6 overflow-auto max-h-screen">
      <h2 className="text-xl font-bold mb-6 text-center text-yellow-700">
        Yoga Practices
      </h2>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your condition, e.g., migraine..."
          className="border border-gray-400 rounded-md px-4 py-2 w-2/3"
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-700 text-white ml-4 px-4 py-2 rounded-md hover:bg-yellow-800"
        >
          QUERY
        </button>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center mt-4">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-yellow-700"></div>
        </div>
      ) : data.length === 0 ? (
        <p className="text-center text-gray-600">
          No results found or loading data...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="text-xl font-semibold text-yellow-800">
                {item.Title || item.title}
              </h3>
              <iframe
                className="w-full h-48 rounded-md mt-2"
                src={item.Link || item.link}
                title={item.Title || item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              <p className="mt-4 text-gray-600">
                {expandedCards[index]
                  ? item.Description || item.description
                  : `${(item.Description || item.description)?.substring(
                      0,
                      100
                    )}...`}
              </p>

              <p className="mt-2 text-gray-700">
                <strong>Benefits:</strong>{" "}
                {expandedCards[index]
                  ? item.Benefits
                  : `${item.Benefits?.substring(0, 100)}...`}
              </p>

              {item.Description?.length > 10 || item.Benefits?.length > 10 ? (
                <button
                  onClick={() => toggleExpand(index)}
                  className="mt-4 text-yellow-700 hover:text-yellow-800 underline"
                >
                  {expandedCards[index] ? "Show Less" : "Read More"}
                </button>
              ) : null}

              <a
                href={item.Link || item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-yellow-700 text-white py-2 px-4 rounded-md hover:bg-yellow-800"
              >
                Watch Video
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Yoga;
