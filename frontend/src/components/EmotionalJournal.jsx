// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { useAuthContext } from "../context/Authcontext";

// const EmotionalJournal = () => {
//   const [entries, setEntries] = useState([]);
//   const [currentEntry, setCurrentEntry] = useState("");
//   const [currentIntensity, setCurrentIntensity] = useState(5);
//   const [currentEmotion, setCurrentEmotion] = useState("");
//   const [editId, setEditId] = useState(null);
//   const [sentimentResult, setSentimentResult] = useState(null);
//   const [expandedDates, setExpandedDates] = useState({}); // Tracks expanded/collapsed state for each date
//   const inputRef = useRef(null);
//   const { Authuser } = useAuthContext();

//   useEffect(() => {
//     if (Authuser) {
//       fetchEntries();
//     }
//   }, [Authuser]);

//   // Fetch all journal entries
//   const fetchEntries = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/Journal/GetAllEmotionalJournalEntries/${Authuser?._id}`
//       );
//       setEntries(response.data.data.entries || []);
//     } catch (err) {
//       console.error("Error fetching entries:", err);
//     }
//   };

//   // Handle save or update entry
//   const handleSave = async () => {
//     if (!currentEntry.trim() || !currentEmotion.trim()) return;
//     if (!currentIntensity || currentIntensity < 0 || currentIntensity > 10 || !Number.isInteger(currentIntensity)) {
//       alert("Intensity must be an integer between 0 and 10");
//       return;
//     }

//     try {
//       // Analyze sentiment of the current entry
//       const sentimentResponse = await axios.post(
//         "http://localhost:8000/score/analyze-sentiment",
//         { text: currentEntry }
//       );

//       const { sentiment, confidence } = sentimentResponse.data;

//       // Map the sentiment label to readable text
//       const readableSentiment = mapSentimentLabel(sentiment);

//       // Set sentiment result for display
//       setSentimentResult({
//         sentiment: readableSentiment,
//         confidence: (confidence * 100).toFixed(2), // Convert to percentage
//       });

//       const payload = {
//         content: currentEntry,
//         intensity: currentIntensity,
//         emotion: currentEmotion,
//         sentiment: readableSentiment,
//         confidence: confidence,
//         date: new Date().toISOString().split('T')[0], // Store the date in YYYY-MM-DD format
//       };

//       if (editId) {
//         await axios.put(
//           `http://localhost:5000/api/Journal/UpdateEmotionalJournalEntry/${editId}/${Authuser?._id}`,
//           payload
//         );
//         setEntries((prev) =>
//           prev.map((entry) =>
//             entry._id === editId ? { ...entry, ...payload } : entry
//           )
//         );
//         setEditId(null);
//       } else {
//         const response = await axios.post(
//           `http://localhost:5000/api/Journal/AddEmotionalJournalEntry/${Authuser?._id}`,
//           payload
//         );
//         setEntries((prev) => [...prev, response.data.journal.entries.pop()]);
//       }

//       setCurrentEntry("");
//       setCurrentIntensity(5);
//       setCurrentEmotion("");
//       inputRef.current.focus();
//     } catch (err) {
//       console.error("Error saving entry:", err);
//     }
//   };

//   // Function to map sentiment labels to readable text
//   const mapSentimentLabel = (label) => {
//     switch (label) {
//       case "LABEL_0":
//         return "NEGATIVE";
//       case "LABEL_1":
//         return "NEUTRAL";
//       case "LABEL_2":
//         return "POSITIVE";
//       default:
//         return "UNKNOWN";
//     }
//   };

//   // Handle edit entry
//   const handleEdit = (entry) => {
//     setCurrentEntry(entry.content);
//     setCurrentIntensity(entry.intensity);
//     setCurrentEmotion(entry.emotion);
//     setEditId(entry._id);
//     inputRef.current.focus();
//   };

//   // Handle delete entry
//   const handleDelete = async (entryId) => {
//     try {
//       await axios.delete(
//         `http://localhost:5000/api/Journal/DeleteEmotionalJournalEntry/${entryId}/${Authuser?._id}`
//       );
//       setEntries(entries.filter((entry) => entry._id !== entryId));
//     } catch (err) {
//       console.error("Error deleting entry:", err);
//     }
//   };

//   // Group entries by date
//   const groupEntriesByDate = () => {
//     const groupedEntries = {};

//     entries.forEach((entry) => {
//       const date = new Date(entry.date).toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       }); // Format date properly
//       if (!groupedEntries[date]) {
//         groupedEntries[date] = [];
//       }
//       groupedEntries[date].push(entry);
//     });

//     return groupedEntries;
//   };

//   // Toggle expanded state for a date
//   const toggleExpand = (date) => {
//     setExpandedDates((prev) => ({
//       ...prev,
//       [date]: !prev[date], // Toggle expanded state
//     }));
//   };

//   const groupedEntries = groupEntriesByDate();

//   // Array of colors for different days
//   const colors = ["bg-pink-50", "bg-blue-50", "bg-green-50", "bg-yellow-50"];

//   return (
//     <div className="overflow-y-auto max-h-screen p-8 font-sans">
//       {/* Information Section */}
//       <section>
//         <h1 className="text-3xl font-bold text-pink-700">Emotional Journal</h1>
//         <h2 className="text-2xl font-semibold mt-4">
//           The Importance of Journaling Your Emotions
//         </h2>
//         <p className="mt-2 text-gray-700">
//           Journaling your emotions is a powerful practice for emotional clarity
//           and mental health. It allows you to process and understand your
//           feelings, reducing stress and anxiety. By writing about your emotions,
//           you can reflect on patterns, triggers, and find ways to manage your
//           emotional responses.
//         </p>
//       <div className="flex gap-4">
//        <img src="https://firebasestorage.googleapis.com/v0/b/chat-app-f65de.appspot.com/o/generate%20a%20image%20of%20a%20journal%20used%20for%20journalling%20emotions%20_%2002-02-2025%20at%2003-02-42.jpeg?alt=media&token=175e655b-c0e3-45e2-8f00-b9555e86eb84" width={300} alt="" />
//        <img src="https://firebasestorage.googleapis.com/v0/b/chat-app-f65de.appspot.com/o/generate%20a%20image%20of%20a%20journal%20used%20for%20journalling%20emotions%20_%2002-02-2025%20at%2003-02-40.jpeg?alt=media&token=0590c797-69c0-498b-9cc5-6567a370368a" width={300} alt="" />
//        <img src="https://firebasestorage.googleapis.com/v0/b/chat-app-f65de.appspot.com/o/generate%20a%20image%20of%20a%20journal%20used%20for%20journalling%20emotions%20_%2002-02-2025%20at%2003-02-34.jpeg?alt=media&token=021e065e-3263-4cb1-bf2e-c111c7e74ec6" width={300} alt="" />
//       </div>
//         {/* Instructions */}
//         <h2 className="text-2xl font-semibold mt-4">How to Get Started</h2>
//         <p className="mt-2 text-gray-700">
//           To begin journaling your emotions, simply write down what you're
//           feeling in the moment. Use this space to express your joy, sadness,
//           anger, or any emotion you're experiencing.
//         </p>
//       </section>

//       {/* Journal Entry Section */}
//       <section className="mt-8">
//         <h2 className="text-2xl font-semibold">Today's Emotional Entry</h2>
//         <textarea
//           ref={inputRef}
//           value={currentEntry}
//           onChange={(e) => setCurrentEntry(e.target.value)}
//           placeholder="What are you feeling today?"
//           className="w-full h-24 p-3 mt-2 border border-gray-300 rounded-md focus:ring focus:ring-pink-400"
//         />
//         <div className="mt-4">
//           <label className="block text-gray-700">Intensity (0-10):</label>
//           <input
//             type="number"
//             min="0"
//             max="10"
//             value={currentIntensity}
//             onChange={(e) => setCurrentIntensity(parseInt(e.target.value))}
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-pink-400"
//           />
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-700">Emotion Felt:</label>
//           <input
//             type="text"
//             value={currentEmotion}
//             onChange={(e) => setCurrentEmotion(e.target.value)}
//             placeholder="Enter the emotion you're feeling"
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-pink-400"
//           />
//         </div>
//         <div className="mt-4">
//           <button
//             onClick={handleSave}
//             className="bg-pink-700 text-white px-4 py-2 rounded-full mr-2 hover:bg-pink-800 transition"
//           >
//             {editId ? "Update Entry" : "Save Entry"}
//           </button>
//           {editId && (
//             <button
//               onClick={() => {
//                 setCurrentEntry("");
//                 setCurrentIntensity(5);
//                 setCurrentEmotion("");
//                 setEditId(null);
//               }}
//               className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
//             >
//               Cancel Edit
//             </button>
//           )}
//         </div>
//       </section>

//       {/* Sentiment Analysis Result */}
//       {sentimentResult && (
//         <section className="mt-8">
//           <h2 className="text-2xl font-semibold">Sentiment Analysis</h2>
//           <div className="bg-white p-4 rounded-md shadow-md mt-4">
//             <p className="text-gray-800">
//               <strong>Sentiment:</strong> {sentimentResult.sentiment}
//             </p>
//             <p className="text-gray-800">
//               <strong>Confidence:</strong> {sentimentResult.confidence}%
//             </p>
//           </div>
//         </section>
//       )}

//       {/* Display Entries Section */}
//       <section className="mt-8">
//         <h2 className="text-2xl font-semibold">Previous Emotional Entries</h2>
//         {entries.length === 0 ? (
//           <p className="mt-2 text-gray-600">
//             No entries yet. Start by journaling your emotions above.
//           </p>
//         ) : (
//           Object.keys(groupedEntries).map((date, index) => (
//             <div
//               key={date}
//               className={`${colors[index % colors.length]} p-4 rounded-lg shadow-md mt-4`}
//             >
//               <h3 className="text-xl font-semibold text-pink-700 mb-4">
//                 {date}
//               </h3>
//               <ul className="space-y-4">
//                 {groupedEntries[date]
//                   .slice(0, expandedDates[date] ? groupedEntries[date].length : 3) // Show only 3 entries initially
//                   .map((entry) => (
//                     <li
//                       key={entry._id}
//                       className="bg-white p-4 rounded-md shadow-md flex flex-col space-y-2"
//                     >
//                       <p className="text-gray-800">
//                         <strong>Journal:</strong> {entry.content}
//                       </p>
//                       <p className="text-gray-800">
//                         <strong>Intensity:</strong> {entry.intensity}/10
//                       </p>
//                       <p className="text-gray-800">
//                         <strong>Emotion:</strong> {entry.emotion}
//                       </p>
//                       <div className="flex justify-end">
//                         <button
//                           onClick={() => handleEdit(entry)}
//                           className="bg-pink-700 text-white px-3 py-1 rounded-md mr-2 hover:bg-pink-800 transition"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(entry._id)}
//                           className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </li>
//                   ))}
//               </ul>
//               {groupedEntries[date].length > 3 && (
//                 <button
//                   onClick={() => toggleExpand(date)}
//                   className="mt-4 text-pink-700 hover:text-pink-800 transition"
//                 >
//                   {expandedDates[date] ? "Show Less..." : "Show More..."}
//                 </button>
//               )}
//             </div>
//           ))
//         )}
//       </section>
//     </div>
//   );
// };

// export default EmotionalJournal;

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../context/Authcontext";

const EmotionalJournal = () => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState("");
  const [currentIntensity, setCurrentIntensity] = useState(5);
  const [currentEmotion, setCurrentEmotion] = useState("");
  const [editId, setEditId] = useState(null);
  const [sentimentResult, setSentimentResult] = useState(null);
  const [expandedDates, setExpandedDates] = useState({});
  const [recommendations, setRecommendations] = useState([]); // State for recommendations
  const inputRef = useRef(null);
  const { Authuser } = useAuthContext();

  useEffect(() => {
    if (Authuser) {
      fetchEntries();
    }
  }, [Authuser]);

  // Fetch all journal entries
  const fetchEntries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/Journal/GetAllEmotionalJournalEntries/${Authuser?._id}`
      );
      setEntries(response.data.data.entries || []);
    } catch (err) {
      console.error("Error fetching entries:", err);
    }
  };

  // Handle save or update entry
  const handleSave = async () => {
    if (!currentEntry.trim() || !currentEmotion.trim()) return;
    if (!currentIntensity || currentIntensity < 0 || currentIntensity > 10 || !Number.isInteger(currentIntensity)) {
      alert("Intensity must be an integer between 0 and 10");
      return;
    }

    try {
      // Analyze sentiment of the current entry
      const sentimentResponse = await axios.post(
        "http://localhost:8000/score/analyze-sentiment",
        { text: currentEntry }
      );

      const { sentiment, confidence } = sentimentResponse.data;

      // Map the sentiment label to readable text
      const readableSentiment = mapSentimentLabel(sentiment);

      // Set sentiment result for display
      setSentimentResult({
        sentiment: readableSentiment,
        confidence: (confidence * 100).toFixed(2), // Convert to percentage
      });

      // If sentiment is negative, fetch recommendations
      if (readableSentiment === "NEGATIVE") {
        const recommendationResponse = await axios.post(
          "http://localhost:8000/general/recommend",
          { user_query: currentEntry }
        );
        setRecommendations(recommendationResponse.data); // Set recommendations
      } else {
        setRecommendations([]); // Clear recommendations if sentiment is not negative
      }

      const payload = {
        content: currentEntry,
        intensity: currentIntensity,
        emotion: currentEmotion,
        sentiment: readableSentiment,
        confidence: confidence,
        date: new Date().toISOString().split('T')[0], // Store the date in YYYY-MM-DD format
      };

      if (editId) {
        await axios.put(
          `http://localhost:5000/api/Journal/UpdateEmotionalJournalEntry/${editId}/${Authuser?._id}`,
          payload
        );
        setEntries((prev) =>
          prev.map((entry) =>
            entry._id === editId ? { ...entry, ...payload } : entry
          )
        );
        setEditId(null);
      } else {
        const response = await axios.post(
          `http://localhost:5000/api/Journal/AddEmotionalJournalEntry/${Authuser?._id}`,
          payload
        );
        setEntries((prev) => [...prev, response.data.journal.entries.pop()]);
      }

      setCurrentEntry("");
      setCurrentIntensity(5);
      setCurrentEmotion("");
      inputRef.current.focus();
    } catch (err) {
      console.error("Error saving entry:", err);
    }
  };

  // Function to map sentiment labels to readable text
  const mapSentimentLabel = (label) => {
    switch (label) {
      case "LABEL_0":
        return "NEGATIVE";
      case "LABEL_1":
        return "NEUTRAL";
      case "LABEL_2":
        return "POSITIVE";
      default:
        return "UNKNOWN";
    }
  };

  // Handle edit entry
  const handleEdit = (entry) => {
    setCurrentEntry(entry.content);
    setCurrentIntensity(entry.intensity);
    setCurrentEmotion(entry.emotion);
    setEditId(entry._id);
    inputRef.current.focus();
  };

  // Handle delete entry
  const handleDelete = async (entryId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/Journal/DeleteEmotionalJournalEntry/${entryId}/${Authuser?._id}`
      );
      setEntries(entries.filter((entry) => entry._id !== entryId));
    } catch (err) {
      console.error("Error deleting entry:", err);
    }
  };

  // Group entries by date
  const groupEntriesByDate = () => {
    const groupedEntries = {};

    entries.forEach((entry) => {
      const date = new Date(entry.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }); // Format date properly
      if (!groupedEntries[date]) {
        groupedEntries[date] = [];
      }
      groupedEntries[date].push(entry);
    });

    return groupedEntries;
  };

  // Toggle expanded state for a date
  const toggleExpand = (date) => {
    setExpandedDates((prev) => ({
      ...prev,
      [date]: !prev[date], // Toggle expanded state
    }));
  };

  const groupedEntries = groupEntriesByDate();

  // Array of colors for different days
  const colors = ["bg-pink-50", "bg-blue-50", "bg-green-50", "bg-yellow-50"];

  return (
    <div className="overflow-y-auto max-h-screen p-8 font-sans">
      {/* Information Section */}
      <section>
        <h1 className="text-3xl font-bold text-pink-700">Emotional Journal</h1>
        <h2 className="text-2xl font-semibold mt-4">
          The Importance of Journaling Your Emotions
        </h2>
        <p className="mt-2 text-gray-700">
          Journaling your emotions is a powerful practice for emotional clarity
          and mental health. It allows you to process and understand your
          feelings, reducing stress and anxiety. By writing about your emotions,
          you can reflect on patterns, triggers, and find ways to manage your
          emotional responses.
        </p>
        <div className="flex gap-4">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/chat-app-f65de.appspot.com/o/generate%20a%20image%20of%20a%20journal%20used%20for%20journalling%20emotions%20_%2002-02-2025%20at%2003-02-42.jpeg?alt=media&token=175e655b-c0e3-45e2-8f00-b9555e86eb84"
            width={300}
            alt=""
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/chat-app-f65de.appspot.com/o/generate%20a%20image%20of%20a%20journal%20used%20for%20journalling%20emotions%20_%2002-02-2025%20at%2003-02-40.jpeg?alt=media&token=0590c797-69c0-498b-9cc5-6567a370368a"
            width={300}
            alt=""
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/chat-app-f65de.appspot.com/o/generate%20a%20image%20of%20a%20journal%20used%20for%20journalling%20emotions%20_%2002-02-2025%20at%2003-02-34.jpeg?alt=media&token=021e065e-3263-4cb1-bf2e-c111c7e74ec6"
            width={300}
            alt=""
          />
        </div>
        {/* Instructions */}
        <h2 className="text-2xl font-semibold mt-4">How to Get Started</h2>
        <p className="mt-2 text-gray-700">
          To begin journaling your emotions, simply write down what you're
          feeling in the moment. Use this space to express your joy, sadness,
          anger, or any emotion you're experiencing.
        </p>
      </section>

      {/* Journal Entry Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Today's Emotional Entry</h2>
        <textarea
          ref={inputRef}
          value={currentEntry}
          onChange={(e) => setCurrentEntry(e.target.value)}
          placeholder="What are you feeling today?"
          className="w-full h-24 p-3 mt-2 border border-gray-300 rounded-md focus:ring focus:ring-pink-400"
        />
        <div className="mt-4">
          <label className="block text-gray-700">Intensity (0-10):</label>
          <input
            type="number"
            min="0"
            max="10"
            value={currentIntensity}
            onChange={(e) => setCurrentIntensity(parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-pink-400"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Emotion Felt:</label>
          <input
            type="text"
            value={currentEmotion}
            onChange={(e) => setCurrentEmotion(e.target.value)}
            placeholder="Enter the emotion you're feeling"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-pink-400"
          />
        </div>
        <div className="mt-4">
          <button
            onClick={handleSave}
            className="bg-pink-700 text-white px-4 py-2 rounded-full mr-2 hover:bg-pink-800 transition"
          >
            {editId ? "Update Entry" : "Save Entry"}
          </button>
          {editId && (
            <button
              onClick={() => {
                setCurrentEntry("");
                setCurrentIntensity(5);
                setCurrentEmotion("");
                setEditId(null);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </section>

      {/* Sentiment Analysis Result */}
      {sentimentResult && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Sentiment Analysis</h2>
          <div className="bg-white p-4 rounded-md shadow-md mt-4">
            <p className="text-gray-800">
              <strong>Sentiment:</strong> {sentimentResult.sentiment}
            </p>
            <p className="text-gray-800">
              <strong>Confidence:</strong> {sentimentResult.confidence}%
            </p>
          </div>
        </section>
      )}

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Recommendations for You</h2>
          <div className="mt-4 space-y-4">
            {recommendations.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-md shadow-md flex flex-col space-y-2"
              >
                <h3 className="text-xl font-semibold text-pink-700">
                  {item.title}
                </h3>
                <p className="text-gray-800">
                  <strong>Type:</strong> {item.type}
                </p>
                <p className="text-gray-800">
                  <strong>Description:</strong> {item.description}
                </p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Watch/Read More
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Display Entries Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Previous Emotional Entries</h2>
        {entries.length === 0 ? (
          <p className="mt-2 text-gray-600">
            No entries yet. Start by journaling your emotions above.
          </p>
        ) : (
          Object.keys(groupedEntries).map((date, index) => (
            <div
              key={date}
              className={`${colors[index % colors.length]} p-4 rounded-lg shadow-md mt-4`}
            >
              <h3 className="text-xl font-semibold text-pink-700 mb-4">
                {date}
              </h3>
              <ul className="space-y-4">
                {groupedEntries[date]
                  .slice(0, expandedDates[date] ? groupedEntries[date].length : 3) // Show only 3 entries initially
                  .map((entry) => (
                    <li
                      key={entry._id}
                      className="bg-white p-4 rounded-md shadow-md flex flex-col space-y-2"
                    >
                      <p className="text-gray-800">
                        <strong>Journal:</strong> {entry.content}
                      </p>
                      <p className="text-gray-800">
                        <strong>Intensity:</strong> {entry.intensity}/10
                      </p>
                      <p className="text-gray-800">
                        <strong>Emotion:</strong> {entry.emotion}
                      </p>
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleEdit(entry)}
                          className="bg-pink-700 text-white px-3 py-1 rounded-md mr-2 hover:bg-pink-800 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(entry._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
              {groupedEntries[date].length > 3 && (
                <button
                  onClick={() => toggleExpand(date)}
                  className="mt-4 text-pink-700 hover:text-pink-800 transition"
                >
                  {expandedDates[date] ? "Show Less..." : "Show More..."}
                </button>
              )}
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default EmotionalJournal;