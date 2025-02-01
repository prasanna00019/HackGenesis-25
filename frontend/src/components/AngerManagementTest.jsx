import React, { useState, useEffect } from "react";

const AngerManagementTest = () => {
  // List of 25 questions with options
  const allQuestions = [
    { question: "How often do you feel irritated?", options: ["Rarely", "Sometimes", "Often", "Always"] },
    { question: "How do you react when someone cuts you off in traffic?", options: ["Ignore", "Mild annoyance", "Shout or honk", "Chase them"] },
    { question: "Do you feel like anger controls you?", options: ["Not at all", "A little", "Sometimes", "Very often"] },
    { question: "How often do you regret something you said in anger?", options: ["Never", "Rarely", "Sometimes", "Often"] },
    { question: "How often do you raise your voice during arguments?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel physically tense when angry?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "How often do you take deep breaths to calm down?", options: ["Always", "Sometimes", "Rarely", "Never"] },
    { question: "Do you use humor to diffuse anger?", options: ["Always", "Sometimes", "Rarely", "Never"] },
    { question: "How often do you walk away from a heated situation?", options: ["Always", "Sometimes", "Rarely", "Never"] },
    { question: "Do you feel guilty after expressing anger?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "How often do you feel misunderstood in arguments?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you blame others for your anger?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "How often do you use physical exercise to manage anger?", options: ["Always", "Sometimes", "Rarely", "Never"] },
    { question: "Do you feel your anger is justified most of the time?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "How often do you seek professional help for anger?", options: ["Always", "Sometimes", "Rarely", "Never"] },
    { question: "Do you feel calm after expressing anger?", options: ["Always", "Sometimes", "Rarely", "Never"] },
    { question: "How often do you feel angry without a clear reason?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you use meditation or mindfulness to manage anger?", options: ["Always", "Sometimes", "Rarely", "Never"] },
    { question: "How often do you feel angry at work?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel angry when someone criticizes you?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "How often do you feel angry about past events?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel angry when things don’t go as planned?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "How often do you feel angry about global issues?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel angry when someone interrupts you?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "How often do you feel angry about your personal life?", options: ["Never", "Rarely", "Sometimes", "Always"] },
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
        <h2 className="text-2xl font-bold text-blue-600 mb-4 uppercase">Anger Management Test</h2>

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
                  className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition-all duration-300 transform hover:-translate-y-1"
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
                ? "You have excellent anger control!"
                : score < 20
                ? "You manage anger well, but there's room for improvement."
                : score < 30
                ? "Your anger sometimes gets the better of you. Consider stress management techniques."
                : "You may need anger management strategies. Seeking help could be beneficial."}
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

export default AngerManagementTest;