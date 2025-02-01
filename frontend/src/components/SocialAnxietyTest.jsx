import React, { useState, useEffect } from "react";

const SocialAnxietyTest = () => {
  
  const allQuestions = [
    { question: "How often do you feel anxious in social situations?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you avoid social gatherings or events?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "How often do you worry about being judged by others?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel self-conscious in front of others?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "How often do you feel nervous when meeting new people?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel like you’re being watched or evaluated by others?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "How often do you avoid speaking up in group settings?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel anxious about eating or drinking in public?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "How often do you feel like you’re being judged for your appearance?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel anxious about public speaking?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "How often do you feel like you’re being excluded from social groups?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel anxious about making phone calls in public?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "How often do you feel like you’re being judged for your opinions?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel anxious about attending parties or social events?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "How often do you feel like you’re being judged for your behavior?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel anxious about being the center of attention?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "How often do you feel like you’re being judged for your social skills?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel anxious about interacting with authority figures?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "How often do you feel like you’re being judged for your performance?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel anxious about being in crowded places?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "How often do you feel like you’re being judged for your mistakes?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel anxious about being criticized by others?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "How often do you feel like you’re being judged for your achievements?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "Do you feel anxious about being rejected by others?", options: ["Never", "Rarely", "Sometimes", "Always"] },
    { question: "How often do you feel like you’re being judged for your personality?", options: ["Never", "Rarely", "Sometimes", "Always"] },
  ];

  
  const getRandomQuestions = () => {
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  };

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState(0);

  
  useEffect(() => {
    setQuestions(getRandomQuestions());
  }, []);

  
  const handleAnswer = (index) => {
    setScore(score + index); 
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setProgress(((currentQuestion + 1) / questions.length) * 100);
    } else {
      setShowResults(true);
      setProgress(100);
    }
  };

  
  const restartTest = () => {
    setQuestions(getRandomQuestions()); 
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setProgress(0);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-bold text-green-600 mb-4 uppercase">Social Anxiety Test</h2>

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
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:-translate-y-1"
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
                ? "You seem to have minimal social anxiety!"
                : score < 20
                ? "You may experience mild social anxiety. Consider practicing social skills or relaxation techniques."
                : score < 30
                ? "You may experience moderate social anxiety. Seeking support or therapy could be helpful."
                : "You may experience severe social anxiety. Please consider reaching out to a mental health professional."}
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
            className="bg-green-600 h-2 rounded-full transition-width duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SocialAnxietyTest;