import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogPage = () => {
  const [data, setData] = useState([]); // Stores all blog data
  const [filteredData, setFilteredData] = useState([]); // Stores filtered blog data
  const [query, setQuery] = useState(""); // Stores user query
  const [loading, setLoading] = useState(false); // Loading state for API call

  // Fetch all blogs on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/Blogs/get-all-blogs")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data); // Initialize filtered data with all blogs
      })
      .catch((error) => console.error("Error fetching Blogs data:", error));
  }, []);

  // Handle search query submission
  const handleSearch = async () => {
    if (!query.trim()) {
      setFilteredData(data); // If query is empty, show all blogs
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/blog/recommend", {
        user_query: query,
      });
      setFilteredData(response.data); // Update filtered data with API response
    } catch (error) {
      console.error("Error fetching recommended blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset to all blogs when query is cleared
  useEffect(() => {
    if (!query.trim()) {
      setFilteredData(data);
    }
  }, [query, data]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 max-w-screen overflow-y-auto">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Blog Articles
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Get Recommendation..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loading ? "RECOMMENDING\..." : "QUERY"}
        </button>
      </div>

      {/* Display Blogs */}
      {filteredData.length === 0 ? (
        <p className="text-center text-gray-500 italic">No articles found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-shadow duration-300"
            >
              <Link to={`/article/${item._id}`}>
                <img
                  src={item.image || "https://via.placeholder.com/300"}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600">
                  <Link to={`/article/${item._id}`}>{item.title}</Link>
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Author:</strong> {item.Author}
                </p>
                <p
                  className="text-gray-700 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPage;