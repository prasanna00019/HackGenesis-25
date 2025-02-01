// import React, { useState, useRef } from 'react';
// import JournalSentimentAnalysis from './JournalSentimentAnalysis';

// const EmotionalJournal = () => {
//   const [entries, setEntries] = useState([]); // Stores all emotional journal entries
//   const [currentEntry, setCurrentEntry] = useState(''); // Holds current input
//   const [editIndex, setEditIndex] = useState(null); // Index for editing entries
//   const inputRef = useRef(null);

//   // Handle saving a new or edited entry
//   const handleSave = () => {
//     if (!currentEntry.trim()) return;

//     if (editIndex !== null) {
//       // Edit existing entry
//       const updatedEntries = [...entries];
//       updatedEntries[editIndex] = currentEntry;
//       setEntries(updatedEntries);
//       setEditIndex(null);
//     } else {
//       // Add new entry
//       setEntries([...entries, currentEntry]);
//     }

//     setCurrentEntry('');
//     inputRef.current.focus();
//   };

//   // Handle editing an entry
//   const handleEdit = (index) => {
//     setCurrentEntry(entries[index]);
//     setEditIndex(index);
//     inputRef.current.focus();
//   };

//   // Handle deleting an entry
//   const handleDelete = (index) => {
//     setEntries(entries.filter((_, i) => i !== index));
//   };

//   return (
//     <div className='overflow-y-auto max-h-screen bg-[#F9F6F6] ' style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
//       {/* Information Section */}
//       <section>
//         <h1>Emotional Journal</h1>
//         <h2>The Importance of Journaling Your Emotions</h2>
//         <p>
//           Journaling your emotions is a powerful practice for emotional clarity and mental health.
//           It allows you to process and understand your feelings, reducing stress and anxiety. By
//           writing about your emotions, you can reflect on patterns, triggers, and find ways to manage
//           your emotional responses.
//         </p>

//         <h2>How to Journal Your Emotions</h2>
//         <ul>
//           <li>Be honest with yourself—don't hold back your feelings.</li>
//           <li>Write freely without judgment, and let the words flow naturally.</li>
//           <li>Focus on what you're feeling right now, without worrying about grammar or structure.</li>
//           <li>Reflect on why you feel this way, and explore the emotions behind your thoughts.</li>
//         </ul>

//         <h2>How to Get Started</h2>
//         <p>
//           To begin journaling your emotions, simply write down what you're feeling in the moment. Use
//           this space to express your joy, sadness, anger, or any emotion you're experiencing. This
//           practice helps build emotional intelligence and resilience over time.
//         </p>
//       </section>

//       {/* Journal Entry Section */}
//       <section style={{ marginTop: '2rem' }}>
//         <h2>Today's Emotional Entry</h2>
//         <textarea
//           ref={inputRef}
//           value={currentEntry}
//           onChange={(e) => setCurrentEntry(e.target.value)}
//           placeholder="What are you feeling today?"
//           style={{ width: '100%', height: '100px', padding: '0.5rem' }}
//         />
//         <div style={{ marginTop: '1rem' }}>
//           <button onClick={handleSave} style={buttonStyle}>
//             {editIndex !== null ? 'Update Entry' : 'Save Entry'}
//           </button>
//           {editIndex !== null && (
//             <button
//               onClick={() => {
//                 setCurrentEntry('');
//                 setEditIndex(null);
//               }}
//               style={{ ...buttonStyle, backgroundColor: 'gray' }}
//             >
//               Cancel Edit
//             </button>
//           )}
//         </div>
//       </section>

//       {/* Display Entries Section */}
//       <section style={{ marginTop: '2rem' }}>
//         <h2>Previous Emotional Entries</h2>
//         {entries.length === 0 ? (
//           <p>No entries yet. Start by journaling your emotions above.</p>
//         ) : (
//           <ul style={{ padding: 0, listStyle: 'none' }}>
//             {entries.map((entry, index) => (
//               <li key={index} style={entryStyle}>
//                 <p>{entry}</p>
//                 <div>
//                   <button onClick={() => handleEdit(index)} style={smallButtonStyle}>Edit</button>
//                   <button onClick={() => handleDelete(index)} style={{ ...smallButtonStyle, backgroundColor: 'red' }}>Delete</button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>
//     <JournalSentimentAnalysis/>
//     </div>
//   );
// };

// // Styles for buttons and entries
// const buttonStyle = {
//   backgroundColor: '#6200ea',
//   color: 'white',
//   padding: '0.5rem 1rem',
//   border: 'none',
//   cursor: 'pointer',
//   marginRight: '0.5rem',
// };

// const smallButtonStyle = {
//   backgroundColor: '#6200ea',
//   color: 'white',
//   padding: '0.3rem 0.5rem',
//   border: 'none',
//   cursor: 'pointer',
//   marginRight: '0.5rem',
// };

// const entryStyle = {
//   background: '#f5f5f5',
//   padding: '1rem',
//   marginBottom: '1rem',
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
// };

// export default EmotionalJournal;

import React, { useState, useRef } from "react";

const EmotionalJournal = () => {
  const [entries, setEntries] = useState([]); // Stores all emotional journal entries
  const [currentEntry, setCurrentEntry] = useState(""); // Holds current input
  const [editIndex, setEditIndex] = useState(null); // Index for editing entries
  const inputRef = useRef(null);

  // Handle saving a new or edited entry
  const handleSave = () => {
    if (!currentEntry.trim()) return;

    if (editIndex !== null) {
      // Edit existing entry
      const updatedEntries = [...entries];
      updatedEntries[editIndex] = currentEntry;
      setEntries(updatedEntries);
      setEditIndex(null);
    } else {
      // Add new entry
      setEntries([...entries, currentEntry]);
    }

    setCurrentEntry("");
    inputRef.current.focus();
  };

  // Handle editing an entry
  const handleEdit = (index) => {
    setCurrentEntry(entries[index]);
    setEditIndex(index);
    inputRef.current.focus();
  };

  // Handle deleting an entry
  const handleDelete = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  return (
    <div className="overflow-y-auto max-h-screen  p-8 font-sans">
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

        <h2 className="text-2xl font-semibold mt-4">
          How to Journal Your Emotions
        </h2>
        <ul className="list-disc list-inside mt-2 text-gray-700">
          <li>Be honest with yourself—don't hold back your feelings.</li>
          <li>
            Write freely without judgment, and let the words flow naturally.
          </li>
          <li>
            Focus on what you're feeling right now, without worrying about
            grammar or structure.
          </li>
          <li>
            Reflect on why you feel this way, and explore the emotions behind
            your thoughts.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4">How to Get Started</h2>
        <p className="mt-2 text-gray-700">
          To begin journaling your emotions, simply write down what you're
          feeling in the moment. Use this space to express your joy, sadness,
          anger, or any emotion you're experiencing. This practice helps build
          emotional intelligence and resilience over time.
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
          <button
            onClick={handleSave}
            className="bg-pink-700 text-white px-4 py-2 rounded-full mr-2 hover:bg-pink-800 transition"
          >
            {editIndex !== null ? "Update Entry" : "Save Entry"}
          </button>
          {editIndex !== null && (
            <button
              onClick={() => {
                setCurrentEntry("");
                setEditIndex(null);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </section>

      {/* Display Entries Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Previous Emotional Entries</h2>
        {entries.length === 0 ? (
          <p className="mt-2 text-gray-600">
            No entries yet. Start by journaling your emotions above.
          </p>
        ) : (
          <ul className="mt-4 space-y-4">
            {entries.map((entry, index) => (
              <li
                key={index}
                className="bg-white p-4 rounded-md shadow-md flex justify-between items-center"
              >
                <p className="text-gray-800">{entry}</p>
                <div>
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-pink-700 text-white px-3 py-1 rounded-md mr-2 hover:bg-pink-800 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default EmotionalJournal;
