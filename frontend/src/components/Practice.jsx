import React, { useState, useEffect } from "react";
import axios from "axios";

const Practice = () => {
  const [meditations, setMeditations] = useState([]);
  const [selectedPractice, setSelectedPractice] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false); // Track if video has started

  // Fetch meditation practices from the backend
  useEffect(() => {
    const fetchMeditations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/Meditation/getAllMeditations");
        setMeditations(response.data);
      } catch (error) {
        console.error("Error fetching meditations:", error);
      }
    };
    fetchMeditations();
  }, []);
  const recordPracticeCompletion = async (practice) => {
    try {
      // Replace the user id as needed; here it's hardcoded.
      const response = await axios.post(
        `http://localhost:5000/api/User/streak-activity/67977a9c8326dd4010f87419`,
        {
          practiceName: practice.title,   // or any field name as expected by your backend
          duration: practice.duration,    // duration in seconds
        }
      );
      console.log("Practice recorded:", response.data);
    } catch (err) {
      console.error("Error recording practice completion:", err);
    }
  };
  // Start the practice session using the duration field from the selected practice
  const startPractice = (practice) => {
    setSelectedPractice(practice);
    setTimeRemaining(practice.duration);
    setPracticeCompleted(false);
    setVideoStarted(false); // Wait until user clicks the overlay to start the timer
    window.onbeforeunload = () => "Are you sure you want to exit the practice?";
  };

 // Timer countdown (starts only when video has started)
useEffect(() => {
    let timer;
    if (selectedPractice && timeRemaining > 0 && videoStarted) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && selectedPractice) {
      setPracticeCompleted(true);
      window.onbeforeunload = null;
      // Record the completed practice on the backend:
      recordPracticeCompletion(selectedPractice);
    }
    return () => clearInterval(timer);
  }, [selectedPractice, timeRemaining, videoStarted]);
  

  // Exit the practice manually
  const exitPractice = () => {
    if (window.confirm("Are you sure you want to exit? Your progress will be lost.")) {
      setSelectedPractice(null);
      setPracticeCompleted(false);
      setTimeRemaining(0);
      setVideoStarted(false);
      window.onbeforeunload = null;
    }
  };

  // Handle user clicking on the overlay button to start the video and timer
  const handleStartVideo = () => {
    setVideoStarted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-pink-700 mb-6">Meditation Practices</h1>

        {!selectedPractice && !practiceCompleted && (
          <>
            <p className="text-gray-600 mb-4">Select a practice to begin:</p>
            <ul className="mb-6">
              {meditations.map((practice) => (
                <li key={practice._id} className="mb-4">
                  <button
                    onClick={() => startPractice(practice)}
                    className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-all"
                  >
                    Start {practice.title}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        {selectedPractice && !practiceCompleted && (
          <div className="relative">
            <h2 className="text-2xl font-semibold mb-4">{selectedPractice.title}</h2>
            <div className="relative">
              {/* Iframe with autoplay disabled initially */}
              <iframe
                width="100%"
                height="315"
                src={
                  videoStarted
                    ? `${selectedPractice.link}${selectedPractice.link.includes('?') ? '&' : '?'}autoplay=1`
                    : selectedPractice.link
                }
                title={selectedPractice.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {/* Overlay button */}
              {!videoStarted && (
                <div
                  onClick={handleStartVideo}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
                >
                  <button className="bg-green-500 text-white px-4 py-2 rounded-full">
                    Click to Start
                  </button>
                </div>
              )}
            </div>
            <p className="text-gray-600 mt-4">
              Time remaining: {Math.floor(timeRemaining / 60)}:
              {String(timeRemaining % 60).padStart(2, "0")} minutes
            </p>
            <button
              onClick={exitPractice}
              className="bg-red-600 text-white px-6 py-2 mt-4 rounded-full hover:bg-red-700 transition-all"
            >
              Exit Practice
            </button>
          </div>
        )}

        {practiceCompleted && selectedPractice && (
          <div>
            <p className="text-green-600 mb-4">
              Completed "{selectedPractice.title}" for {Math.floor(selectedPractice.duration / 60)} minutes.
            </p>
            <button
              onClick={() => {
                setSelectedPractice(null);
                setPracticeCompleted(false);
              }}
              className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-all"
            >
              Choose Another Practice
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Practice;
