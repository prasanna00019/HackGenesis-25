import React from 'react';
const FancyLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-20 h-20 animate-spin">
        <div className="absolute top-0 left-0 w-full h-full border-t-4 border-indigo-500 rounded-full opacity-75"></div>
        <div className="absolute top-0 left-0 w-full h-full border-t-4 border-pink-500 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full border-t-4 border-yellow-400 rounded-full opacity-30 animate-pulse"></div>
      </div>
    </div>
  );
};
export default FancyLoader;
