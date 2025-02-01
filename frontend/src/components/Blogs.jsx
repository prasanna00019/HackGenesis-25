import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/Blogs/get-all-blogs")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching Blogs data:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Blog Articles
      </h1>

      {data.length === 0 ? (
        <p className="text-center text-gray-500 italic">Loading Blogs...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-shadow duration-300"
            >
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={item.image || "https://via.placeholder.com/300"}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              </a>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600">
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Author:</strong> {item.Author}
                </p>
                <p className="text-gray-700 line-clamp-3">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
