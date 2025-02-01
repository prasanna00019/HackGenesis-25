import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ArticlePage = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/Blogs/get-blog/${id}`
        );
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 italic">Loading article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500">Article not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{article.title}</h1>
        <p className="text-sm text-gray-600 mb-6">
          <strong>Author:</strong> {article.Author}
        </p>
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
        )}
        <div className="prose max-w-none">
          <p className="text-gray-700" dangerouslySetInnerHTML={{__html: article.content}}></p>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;