import React, { useState, useRef, useEffect } from "react";
import { useAuthContext } from "../context/Authcontext";
import axios from "axios";

const GratitudeJournal = () => {
  const [entries, setEntries] = useState([]); // Stores all gratitude entries
  const [currentEntry, setCurrentEntry] = useState(""); // Holds current input
  const [editId, setEditId] = useState(null); // ID for editing entries
  const [expandedDates, setExpandedDates] = useState({}); // Tracks expanded/collapsed state for each date
  const inputRef = useRef(null);
  const { Authuser } = useAuthContext();

  useEffect(() => {
    if (Authuser) {
      fetchEntries();
    }
  }, [Authuser]);

  // Fetch all entries for a user
  const fetchEntries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/Journal/GetAllGratitudeEntries/${Authuser?._id}`
      );
      setEntries(response.data.data.entries || []);
    } catch (err) {
      console.error("Error fetching entries:", err);
    }
  };

  // Handle adding/updating entries
  const handleSave = async () => {
    if (!currentEntry.trim()) return;
    const payload = { content: currentEntry };

    try {
      if (editId) {
        // Update existing entry
        await axios.put(
          `http://localhost:5000/api/Journal/UpdateGratitudeEntry/${editId}/${Authuser?._id}`,
          { content: currentEntry }
        );
        setEntries((prevEntries) =>
          prevEntries.map((entry) =>
            entry._id === editId ? { ...entry, content: currentEntry } : entry
          )
        );
      } else {
        // Add new entry
        const response = await axios.post(
          `http://localhost:5000/api/Journal/AddGratitudeEntry/${Authuser?._id}`,
          payload
        );
        setEntries((prevEntries) => [
          ...prevEntries,
          response.data.journal.entries[response.data.journal.entries.length - 1],
        ]);
      }
      setCurrentEntry("");
      setEditId(null);
    } catch (err) {
      console.error("Error saving entry:", err);
    }
  };

  // Handle editing an entry
  const handleEdit = (entry) => {
    setCurrentEntry(entry.content);
    setEditId(entry._id);
    inputRef.current.focus();
  };

  // Handle deleting an entry
  const handleDelete = async (entryId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/Journal/DeleteGratitudeEntry/${entryId}/${Authuser?._id}`
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
        <h1 className="text-3xl font-bold text-pink-700">Gratitude Journal</h1>
        <h2 className="text-2xl font-semibold mt-4">Why Practice Gratitude?</h2>
        <p className="mt-2 text-gray-700">
          Gratitude is one of the simplest ways to transform your life. It shifts
          your focus from what you lack to the abundance around you. Rhonda
          Byrne, in "The Magic," describes gratitude as the key to unlocking a
          fulfilling and joyful life.
        </p>
        <div className="flex gap-3">
          <img
            className="mt-5"
            src="https://firebasestorage.googleapis.com/v0/b/chat-app-f65de.appspot.com/o/TS_Memory_Game_The_Magic.webp?alt=media&token=3bd4e534-15c1-4096-99ee-1e7fcb2ed443"
            alt="The Magic Book"
          />
          <img
            className="mt-5"
            src="https://firebasestorage.googleapis.com/v0/b/chat-app-f65de.appspot.com/o/rhonda_magic_book.jpeg?alt=media&token=efdb520b-26c9-472f-9ec7-8337826aa037"
            alt="Rhonda Byrne"
          />
          <img className="mt-5" width={300} src="https://firebasestorage.googleapis.com/v0/b/chat-app-f65de.appspot.com/o/generate%20a%20image%20of%20a%20journal%20used%20for%20journalling%20gratitude%2002-02-2025%20at%2003-55-44.jpeg?alt=media&token=02804f5b-f0bf-4249-9194-e39e83a284a0" alt="" />
        </div>
        <h2 className="text-2xl font-semibold mt-4">How to Practice Gratitude</h2>
        <ul className="list-disc list-inside mt-2 text-gray-700">
          <li>Start your day by writing three things you're grateful for.</li>
          <li>
            Be specific—instead of saying "I'm grateful for my family," say "I'm
            grateful for my mother's support yesterday."
          </li>
          <li>Feel the gratitude as you write it down.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4">How to Journal Gratitude</h2>
        <p className="mt-2 text-gray-700">
          Write down your blessings daily, visualize them as you write, and truly
          feel thankful. Journaling allows you to reflect on positive moments and
          cultivate a grateful mindset.
        </p>
      </section>

      {/* Journal Entry Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Today's Gratitude Entry</h2>
        <textarea
          ref={inputRef}
          value={currentEntry}
          onChange={(e) => setCurrentEntry(e.target.value)}
          placeholder="What are you grateful for today?"
          className="w-full h-24 p-3 mt-2 border border-gray-300 rounded-md focus:ring focus:ring-pink-400"
        />
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
                setEditId(null);
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
        <h2 className="text-2xl font-semibold">Previous Gratitude Entries</h2>
        {entries.length === 0 ? (
          <p className="mt-2 text-gray-600">
            No entries yet. Start by journaling your gratitude above.
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
                      className="bg-white p-4 rounded-md shadow-md flex justify-between items-center"
                    >
                      <p className="text-gray-800">{entry.content}</p>
                      <div>
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

export default GratitudeJournal;