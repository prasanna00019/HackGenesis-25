import React, { useState, useEffect } from "react";

const DepressionTest = () => {
  // List of 25 questions with options
  const allQuestions = [
    { question: "How often do you feel sad or down?", options: ["Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you have trouble sleeping?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel tired or lack energy?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you have difficulty concentrating?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel hopeless about the future?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you lose interest in activities you used to enjoy?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel guilty or worthless?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you have changes in appetite or weight?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel restless or agitated?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you have thoughts of self-harm or suicide?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel isolated or lonely?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you cry frequently?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel unmotivated to do daily tasks?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel like a burden to others?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you avoid social interactions?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel like life is meaningless?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you have trouble making decisions?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel irritable or angry for no reason?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel like you’re moving or speaking slowly?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel like you’re in a fog?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel like you’ve lost your sense of purpose?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel like you’re stuck in a rut?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel like you’re unable to enjoy anything?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel like you’re constantly overwhelmed?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel like you’re unable to cope with daily life?", options: ["Never", "Rarely", "Sometimes", "Always"] },
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
        <h2 className="text-2xl font-bold text-purple-600 mb-4 uppercase">Depression Test</h2>

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
                  className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-all duration-300 transform hover:-translate-y-1"
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
                ? "You seem to be doing well emotionally!"
                : score < 20
                ? "You may be experiencing mild symptoms of depression. Consider self-care strategies."
                : score < 30
                ? "You may be experiencing moderate symptoms of depression. Seeking support could be helpful."
                : "You may be experiencing severe symptoms of depression. Please consider reaching out to a mental health professional."}
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
            className="bg-purple-600 h-2 rounded-full transition-width duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DepressionTest;