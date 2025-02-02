import React, { useEffect, useState } from "react";
import axios from "axios";

const Quote = () => {
  const [quotes, setQuotes] = useState([]); // State to store all quotes
  const [randomQuote, setRandomQuote] = useState(null); // State to store the current random quote
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  // Fetch all quotes from the backend
  const fetchQuotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/Quotes/all-quotes");
      setQuotes(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching quotes:", err);
      setError("Failed to fetch quotes. Please try again later.");
      setLoading(false);
    }
  };

  // Select a random quote from the fetched quotes
  const getRandomQuote = () => {
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setRandomQuote(quotes[randomIndex]);
    }
  };

  // Fetch quotes on component mount
  useEffect(() => {
    fetchQuotes();
  }, []);

  // Set a random quote once quotes are fetched
  useEffect(() => {
    if (quotes.length > 0) {
      getRandomQuote();
    }
  }, [quotes]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-pink-700 mb-6">Daily Inspiration</h1>

        {loading ? (
          <p className="text-gray-600">Loading quote...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : randomQuote ? (
          <div>
            <img
              src={randomQuote.image}
              alt="Quote"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-lg italic">"{randomQuote.quote}"</p>
            <p className="mt-2 text-right font-semibold">- {randomQuote.author}</p>
          </div>
        ) : (
          <p className="text-gray-600">No quotes available.</p>
        )}

        <button
          onClick={getRandomQuote}
          className="mt-6 bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-all"
        >
          New Quote
        </button>
      </div>
    </div>
  );
};

export default Quote;