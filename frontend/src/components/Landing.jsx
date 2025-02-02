import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/Authcontext";
import axios from "axios";
import useLogout from "../pages/useLogout";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const { Authuser } = useAuthContext();
  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState(null); // State to store the random quote
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors
  const { logout } = useLogout();
  const navigate=useNavigate();
  const handleLogout = () => {
    logout();
  };
  // Fetch all quotes
  const fetchAllQuotes = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/Quotes/all-quotes`);
      setQuotes(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching quotes:", err);
      setError("Failed to fetch quotes. Please try again later.");
      setLoading(false);
    }
  };

  // Select a random quote when quotes are fetched
  useEffect(() => {
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setRandomQuote(quotes[randomIndex]);
    }
  }, [quotes]);

  // Fetch quotes on component mount
  useEffect(() => {
    fetchAllQuotes();
  }, []);

  return (
    <div>
      {/* Header */}
      <header className="bg-white">
        <div className="mx-auto flex h-16 max-w-screen-xl justify-evenly items-center gap-16 px-4 sm:px-6 lg:px-8">
          <a className="block text-teal-600" href="#">
            <span className="sr-only">Home</span>
            <svg
              id="logo-70"
              width="78"
              height="30"
              viewBox="0 0 78 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.5147 0C15.4686 0 12.5473 1.21005 10.3934 3.36396L3.36396 10.3934C1.21005 12.5473 0 15.4686 0 18.5147C0 24.8579 5.14214 30 11.4853 30C14.5314 30 17.4527 28.7899 19.6066 26.636L24.4689 21.7737C24.469 21.7738 24.4689 21.7736 24.4689 21.7737L38.636 7.6066C39.6647 6.57791 41.0599 6 42.5147 6C44.9503 6 47.0152 7.58741 47.7311 9.78407L52.2022 5.31296C50.1625 2.11834 46.586 0 42.5147 0C39.4686 0 36.5473 1.21005 34.3934 3.36396L15.364 22.3934C14.3353 23.4221 12.9401 24 11.4853 24C8.45584 24 6 21.5442 6 18.5147C6 17.0599 6.57791 15.6647 7.6066 14.636L14.636 7.6066C15.6647 6.57791 17.0599 6 18.5147 6C20.9504 6 23.0152 7.58748 23.7311 9.78421L28.2023 5.31307C26.1626 2.1184 22.5861 0 18.5147 0Z"
                className="ccustom"
                fill="#394149"
              ></path>
              <path
                d="M39.364 22.3934C38.3353 23.4221 36.9401 24 35.4853 24C33.05 24 30.9853 22.413 30.2692 20.2167L25.7982 24.6877C27.838 27.8819 31.4143 30 35.4853 30C38.5314 30 41.4527 28.7899 43.6066 26.636L62.636 7.6066C63.6647 6.57791 65.0599 6 66.5147 6C69.5442 6 72 8.45584 72 11.4853C72 12.9401 71.4221 14.3353 70.3934 15.364L63.364 22.3934C62.3353 23.4221 60.9401 24 59.4853 24C57.0498 24 54.985 22.4127 54.269 20.2162L49.798 24.6873C51.8377 27.8818 55.4141 30 59.4853 30C62.5314 30 65.4527 28.7899 67.6066 26.636L74.636 19.6066C76.7899 17.4527 78 14.5314 78 11.4853C78 5.14214 72.8579 0 66.5147 0C63.4686 0 60.5473 1.21005 58.3934 3.36396L39.364 22.3934Z"
                className="ccustom"
                fill="#394149"
              ></path>
            </svg>
          </a>
          <h1 className="text-3xl font-bold text-pink-600">MoodMap</h1>

          <div className="flex flex-1 items-center justify-end md:justify-between">
         
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                {!Authuser && (
                  <a
                    className="block rounded-full bg-pink-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-pink-700"
                    href="#"
                  >
                    Login
                  </a>
                )}

                {!Authuser && (
                  <a
                    className="hidden rounded-full bg-gray-100 px-5 py-2.5 text-sm font-medium text-pink-600 transition hover:text-pink-600/75 sm:block"
                    href="#"
                  >
                    Register
                  </a>
                )}
                {
                  Authuser && (
                    <button 
                    onClick={handleLogout} 
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                  )
                }
              </div>

              <button className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="">
        <div className="absolute top-10 left-20 rotate-12 sm:top-16 sm:left-36">
          <img
            src={"https://cdn-icons-png.flaticon.com/128/900/900618.png"}
            alt=""
            className="w-8 h-8 sm:w-12 sm:h-12 opacity-30 hover:scale-105 transition-all"
          />
        </div>
        <div className="absolute top-36 right-10 -rotate-12 sm:top-44 sm:right-20">
          <img
            src={"https://cdn-icons-png.flaticon.com/128/675/675795.png"}
            alt=""
            className="w-8 h-8 sm:w-12 sm:h-12 opacity-30 hover:scale-105 transition-all"
          />
        </div>
        <div className="absolute bottom-20 left-12 rotate-6 sm:bottom-28 sm:left-24">
          <img
            src={"https://cdn-icons-png.flaticon.com/128/4350/4350670.png"}
            alt=""
            className="w-8 h-8 sm:w-12 sm:h-12 opacity-30 hover:scale-105 transition-all"
          />
        </div>
        <div className="absolute top-72 right-16 rotate-3 sm:top-80 sm:right-36">
          <img
            src={"https://cdn-icons-png.flaticon.com/128/880/880910.png"}
            alt=""
            className="w-8 h-8 sm:w-12 sm:h-12 opacity-30 hover:scale-105 transition-all"
          />
        </div>
        <div className="absolute top-48 left-10 rotate-15 sm:top-56 sm:left-28">
          <img
            src={"https://cdn-icons-png.flaticon.com/128/5761/5761031.png"}
            alt=""
            className="w-8 h-8 sm:w-12 sm:h-12 opacity-30 hover:scale-105 transition-all"
          />
        </div>
        <div className="absolute bottom-10 right-24 -rotate-15 sm:bottom-20 sm:right-40">
          <img
            src={"https://cdn-icons-png.flaticon.com/128/4248/4248082.png"}
            alt=""
            className="w-8 h-8 sm:w-12 sm:h-12 opacity-30 hover:scale-105 transition-all"
          />
        </div>
        <div className="absolute top-20 right-8 -rotate-6 sm:top-28 sm:right-16">
          <img
            src={"https://cdn-icons-png.flaticon.com/128/3463/3463930.png"}
            alt=""
            className="w-8 h-8 sm:w-12 sm:h-12 opacity-30 hover:scale-105 transition-all"
          />
        </div>
        <div className="absolute bottom-36 left-36 rotate-9 sm:bottom-48 sm:left-52">
          <img
            src={"https://cdn-icons-png.flaticon.com/128/10069/10069386.png"}
            alt=""
            className="w-8 h-8 sm:w-12 sm:h-12 opacity-30 hover:scale-105 transition-all"
          />
        </div>
        <div className="absolute top-60 left-8 rotate-6 sm:top-72 sm:left-20">
          <img
            src={"https://cdn-icons-png.flaticon.com/128/13515/13515121.png"}
            alt=""
            className="w-8 h-8 sm:w-12 sm:h-12 opacity-30 hover:scale-105 transition-all"
          />
        </div>
        <div className="absolute bottom-10 right-10 -rotate-6 sm:bottom-16 sm:right-20">
          <img
            src={"https://cdn-icons-png.flaticon.com/128/10971/10971322.png"}
            alt=""
            className="w-8 h-8 sm:w-12 sm:h-12 opacity-30 hover:scale-105 transition-all"
          />
        </div>
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl text-black">
              Transform Your Mind
              <strong className="font-extrabold text-pink-700 sm:block">
                Find Your Peace.
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              A Mental health platform to help you find your peace, regain
              confidence, and live your life to the fullest.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
             {!Authuser? <button
                className="block w-full rounded-full bg-pink-600 px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-pink-700 focus:ring-3 focus:outline-hidden sm:w-auto"
                onClick={()=>{navigate('/signup')}}
              >
                Get Started
              </button>:
              <button 
              onClick={()=>{navigate('/home/dashboard')}} 
              className="block w-full rounded-full bg-pink-600 px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-pink-700 focus:ring-3 focus:outline-hidden sm:w-auto">
               Go to Dashboard
              </button>
              }
            </div>
          </div>

          {/* Random Quote Section */}
          {loading ? (
            <p className="text-center">Loading quote...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            randomQuote && (
              <div className="mt-8 p-6 bg-white rounded-lg shadow-md max-w-sm">
                <img
                  src={randomQuote.image}
                  alt="Quote"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="mt-4 text-lg italic">"{randomQuote.quote}"</p>
                <p className="mt-2 text-right font-semibold">
                  - {randomQuote.author}
                </p>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Landing;