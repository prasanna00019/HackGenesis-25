import React, { useState, useRef, useEffect } from 'react';
import { useAuthContext } from '../context/Authcontext';
import axios from 'axios';
const GratitudeJournal = () => {
  const [entries, setEntries] = useState([]); 
  const [currentEntry, setCurrentEntry] = useState(''); 
  const [editId, setEditId] = useState(null); 
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
      const response = await axios.get(`http://localhost:5000/api/Journal/GetAllGratitudeEntries/${Authuser?._id}`);
      // console.log(response)
      setEntries(response.data.data.entries|| []);
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
        await axios.put(`http://localhost:5000/api/Journal/UpdateGratitudeEntry/${editId}/${Authuser?._id}`, {
          content: currentEntry,
        });
        setEntries((prevEntries) =>
          prevEntries.map((entry) => (entry._id === editId ? { ...entry, content: currentEntry } : entry))
        );
      } else {
        // Add new entry
        const response = await axios.post(`http://localhost:5000/api/Journal/AddGratitudeEntry/${Authuser?._id}`, payload);
        setEntries((prevEntries) => [...prevEntries, response.data]);
      }
      setCurrentEntry('');
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
      await axios.delete(`http://localhost:5000/api/Journal/DeleteGratitudeEntry/${entryId}/${Authuser?._id}`);
      setEntries(entries.filter((entry) => entry._id !== entryId));
    } catch (err) {
      console.error("Error deleting entry:", err);
    }
  };

  return (
    <div className='bg-[#F9F6F6] overflow-y-auto max-h-screen' style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      {/* Information Section */}
      <section>
        <h1>Gratitude Journal</h1>
        <h2>Why Practice Gratitude?</h2>
        <p>
          Gratitude is one of the simplest ways to transform your life. It shifts your focus from what
          you lack to the abundance around you. Rhonda Byrne, in "The Magic," describes gratitude as
          the key to unlocking a fulfilling and joyful life.
        </p>

        <h2>How to Practice Gratitude</h2>
        <ul>
          <li>Start your day by writing three things you're grateful for.</li>
          <li>Be specific—instead of saying "I'm grateful for my family," say "I'm grateful for my mother's support yesterday."</li>
          <li>Feel the gratitude as you write it down.</li>
        </ul>

        <h2>How to Journal Gratitude</h2>
        <p>
          Write down your blessings daily, visualize them as you write, and truly feel thankful.
          Journaling allows you to reflect on positive moments and cultivate a grateful mindset.
        </p>
      </section>

      {/* Journal Entry Section */}
      <section style={{ marginTop: '2rem' }}>
        <h2>Today's Gratitude Entry</h2>
        <textarea
          ref={inputRef}
          value={currentEntry}
          onChange={(e) => setCurrentEntry(e.target.value)}
          placeholder="What are you grateful for today?"
          style={{ width: '100%', height: '100px', padding: '0.5rem' }}
        />
        <div style={{ marginTop: '1rem' }}>
          <button onClick={handleSave} style={buttonStyle}>
            {editId ? 'Update Entry' : 'Save Entry'}
          </button>
          {editId && (
            <button
              onClick={() => {
                setCurrentEntry('');
                setEditId(null);
              }}
              style={{ ...buttonStyle, backgroundColor: 'gray' }}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </section>

      {/* Display Entries Section */}
      <section style={{ marginTop: '2rem' }}>
        <h2>Previous Gratitude Entries</h2>
        {entries.length === 0 ? (
          <p>No entries yet. Start by journaling your gratitude above.</p>
        ) : (
          <ul style={{ padding: 0, listStyle: 'none' }}>
            {entries.map((entry) => (
              <li key={entry._id} style={entryStyle}>
                <p>{entry.content}</p>
                <div>
                  <button onClick={() => handleEdit(entry)} style={smallButtonStyle}>Edit</button>
                  <button onClick={() => handleDelete(entry._id)} style={{ ...smallButtonStyle, backgroundColor: 'red' }}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

// Styles for buttons and entries
const buttonStyle = {
  backgroundColor: '#6200ea',
  color: 'white',
  padding: '0.5rem 1rem',
  border: 'none',
  cursor: 'pointer',
  marginRight: '0.5rem',
};

const smallButtonStyle = {
  backgroundColor: '#6200ea',
  color: 'white',
  padding: '0.3rem 0.5rem',
  border: 'none',
  cursor: 'pointer',
  marginRight: '0.5rem',
};

const entryStyle = {
  background: '#f5f5f5',
  padding: '1rem',
  marginBottom: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export default GratitudeJournal;
