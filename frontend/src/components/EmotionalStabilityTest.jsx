import React, { useState, useEffect } from "react";

const EmotionalStabilityTest = () => {
  // List of 25 questions with options
  const allQuestions = [
    { question: "How often do you feel calm and composed?", options: ["Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you feel overwhelmed by stress?", options: ["Always", "Often", "Sometimes", "Rarely"] },
    { question: "How well do you handle unexpected changes?", options: ["Poorly", "Somewhat", "Well", "Very well"] },
    { question: "Do you feel in control of your emotions?", options: ["Rarely", "Sometimes", "Often", "Always"] },
    { question: "How often do you feel anxious or worried?", options: ["Always", "Often", "Sometimes", "Rarely"] },
    { question: "Do you recover quickly from setbacks?", options: ["Rarely", "Sometimes", "Often", "Always"] },
    { question: "How often do you feel happy and content?", options: ["Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you feel emotionally balanced most of the time?", options: ["Rarely", "Sometimes", "Often", "Always"] },
    { question: "How often do you feel irritable or moody?", options: ["Always", "Often", "Sometimes", "Rarely"] },
    { question: "Do you feel confident in your ability to handle challenges?", options: ["Rarely", "Sometimes", "Often", "Always"] },
    { question: "How often do you feel at peace with yourself?", options: ["Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you feel like your emotions are unpredictable?", options: ["Always", "Often", "Sometimes", "Rarely"] },
    { question: "How often do you feel supported by others?", options: ["Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you feel like you can express your emotions effectively?", options: ["Rarely", "Sometimes", "Often", "Always"] },
    { question: "How often do you feel like you’re on an emotional rollercoaster?", options: ["Always", "Often", "Sometimes", "Rarely"] },
    { question: "Do you feel like you can manage stress effectively?", options: ["Rarely", "Sometimes", "Often", "Always"] },
    { question: "How often do you feel like you’re in control of your life?", options: ["Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you feel like you can stay calm under pressure?", options: ["Rarely", "Sometimes", "Often", "Always"] },
    { question: "How often do you feel like you’re able to let go of negative emotions?", options: ["Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you feel like you can adapt to new situations easily?", options: ["Rarely", "Sometimes", "Often", "Always"] },
    { question: "How often do you feel like you’re able to focus on the present moment?", options: ["Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you feel like you can maintain a positive outlook?", options: ["Rarely", "Sometimes", "Often", "Always"] },
    { question: "How often do you feel like you’re able to resolve conflicts calmly?", options: ["Rarely", "Sometimes", "Often", "Always"] },
    { question: "Do you feel like you can bounce back from failure?", options: ["Rarely", "Sometimes", "Often", "Always"] },
    { question: "How often do you feel like you’re able to maintain healthy relationships?", options: ["Rarely", "Sometimes", "Often", "Always"] },
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
        <h2 className="text-2xl font-bold text-blue-600 mb-4 uppercase">Emotional Stability Test</h2>

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
                ? "You have excellent emotional stability!"
                : score < 20
                ? "You have good emotional stability but could improve in some areas."
                : score < 30
                ? "You may experience some emotional instability. Consider mindfulness or stress management techniques."
                : "You may experience significant emotional instability. Seeking support could be beneficial."}
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

export default EmotionalStabilityTest;