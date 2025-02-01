import React from "react";
import useLogout from "./useLogout";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { logout } = useLogout();
  const navigate=useNavigate();
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-pink-100 p-4 text-gray-800">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-pink-600">MoodMap</h1>
        <button 
          onClick={handleLogout} 
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      <main className="text-center">
        <h2 className="text-4xl font-semibold mb-4">
          Transform Your Mind, <span className="text-pink-600">Find Your Peace</span>
        </h2>
        <p className="mb-8">
          Discover a sanctuary of tranquility in your daily life. Our proven techniques help
          you manage stress, reduce anxiety, and cultivate lasting inner peace.
        </p>
        <div className="flex justify-center gap-4">
          <button 
          onClick={()=>{navigate('/home/dashboard');}}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Get Started Now
          </button>
          <button 
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Learn More
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
