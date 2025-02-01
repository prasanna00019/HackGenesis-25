import React, { useState, useEffect } from "react";

const ADHDTest = () => {
  // List of 25 ADHD-related questions with options
  const allQuestions = [
    { question: "Do you often find it hard to focus on tasks or conversations?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you frequently lose or forget things like keys, wallet, or phone?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "How often do you struggle to complete tasks before getting distracted?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you find yourself constantly fidgeting or moving when seated?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you often struggle to follow through on instructions or plans?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "How often do you act impulsively without thinking of the consequences?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you find it hard to organize tasks and manage time effectively?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "How often do you feel restless and need to move around?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you frequently interrupt others while they are speaking?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you struggle to wait your turn in conversations or activities?", options: ["Never", "Rarely", "Sometimes", "Always"] }
  ];

  // Randomly select 10 questions
  const getRandomQuestions = () => {
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  };

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState(0);

  // Initialize random questions on component mount
  useEffect(() => {
    setQuestions(getRandomQuestions());
  }, []);

  // Handle answer selection
  const handleAnswer = (index) => {
    setScore(score + index); // Update score based on the answer index
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setProgress(((currentQuestion + 1) / questions.length) * 100);
    } else {
      setShowResults(true);
      setProgress(100);
    }
  };

  // Restart the test
  const restartTest = () => {
    setQuestions(getRandomQuestions()); // Reset with new random questions
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setProgress(0);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 uppercase">ADHD Test</h2>

        {/* Question or Results */}
        {!showResults ? (
          <>
            <p className="text-lg text-gray-700 mb-4 transition-opacity duration-300">
              {questions[currentQuestion]?.question}
            </p>

            {/* Options */}
            <div className="space-y-3">
              {questions[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-lg text-gray-700 mb-4">
              {score < 10
                ? "You show minimal signs of ADHD!"
                : score < 20
                ? "You may have mild ADHD tendencies. Consider focusing on time management techniques."
                : score < 30
                ? "You may have moderate ADHD tendencies. Seeking support or structured routines could be helpful."
                : "You may have severe ADHD tendencies. Consider reaching out to a mental health professional for evaluation."}
            </p>

            {/* Restart Button */}
            <button
              onClick={restartTest}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-1"
            >
              Restart Test
            </button>
          </>
        )}

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-6">
          <div
            className="bg-blue-600 h-2 rounded-full transition-width duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ADHDTest;
