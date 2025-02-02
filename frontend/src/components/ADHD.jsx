import React from "react";
import adhdimg from '../assets/adhd.jpg';
import { useNavigate } from "react-router-dom";
const ADHD = () => {
    const navigate=useNavigate();
  const handleStartClick = () => {
    navigate('/home/dashboard/ADHD-mangement/Test');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-5">
      <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-lg w-full animate-fade-in">
        <header>
          <h1 className="text-3xl font-semibold text-teal-800 mb-4">
            ADHD Test
          </h1>
          <img
            src={adhdimg}
            alt="ADHD Test"
            className="w-full max-w-xs mx-auto rounded-lg shadow-md transition-transform transform hover:scale-105 mb-5"
          />
        </header>
        <main>
          <section className="text-gray-700">
            <p className="text-lg leading-relaxed mb-4">
              ADHD, or Attention Deficit Hyperactivity Disorder, is
              characterised by difficulty in paying attention, restlessness,
              and impulsivity. It is often mistaken for laziness or lack of
              organisation; however, this is far from the truth. Take this quiz
              to find out if you are experiencing any signs of adult ADHD.
            </p>
            <p className="text-teal-700 font-bold text-lg mb-6">
              20 Questions | 10 Minutes
            </p>
            <button
              onClick={handleStartClick}
              className="bg-teal-600 hover:bg-teal-700 text-white text-lg font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Get Started!
            </button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ADHD;
