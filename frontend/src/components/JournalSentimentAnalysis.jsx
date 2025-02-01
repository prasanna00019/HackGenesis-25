import React, { useState } from "react";

const JournalSentimentAnalysis = () => {
  const [journalEntry, setJournalEntry] = useState("");
  const [result, setResult] = useState(null);

  const analyzeSentiment = async () => {
    if (!journalEntry.trim()) {
      alert("Please enter a journal entry!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/score/analyze-sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: journalEntry }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch sentiment analysis.");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      setResult({ error: "Failed to analyze sentiment." });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Journal Sentiment Analysis</h1>
      <textarea
        value={journalEntry}
        onChange={(e) => setJournalEntry(e.target.value)}
        placeholder="Write your journal entry here..."
        className="w-full h-40 p-2 border rounded-md text-lg"
      />
      <button
        onClick={analyzeSentiment}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Analyze Sentiment
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          {result.error ? (
            <p className="text-red-600">{result.error}</p>
          ) : (
            <>
              <p>
                <strong>Journal Entry:</strong> {result.text}
              </p>
              <p>
                <strong>Sentiment:</strong> {result.sentiment==='LABEL_1'?'NEUTRAL':result.sentiment==='LABEL_0'?'NEGATIVE':'POSITIVE'}
              </p>
              <p>
                <strong>Polarity Score:</strong> {result.confidence.toFixed(2)}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default JournalSentimentAnalysis;
