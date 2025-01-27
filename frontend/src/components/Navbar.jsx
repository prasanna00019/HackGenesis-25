
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import {
  FaHome,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaSignInAlt,
  FaUserPlus,
  FaDollarSign // Updated icon for pricing
} from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [Authuser, setAuthuser] = useState(null); // Just for UI example, simulate if user is logged in
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);

  // Handle the scroll event
  const handleScroll = () => {
    if (window.scrollY > prevScrollY) {
      // Scrolling down
      setNavbarVisible(false); // Hide navbar
    } else {
      // Scrolling up
      setNavbarVisible(true); // Show navbar
    }
    setPrevScrollY(window.scrollY); // Update the previous scroll position
  };

  // Use effect hook to add and remove the event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY]);

  return (
    <nav
      className={`bg-transperant text-black p-4 sm:py-2  transition-transform duration-300 ease-in-out ${
        navbarVisible ? 'translate-y-0' : '-translate-y-full'
      } fixed w-full top-0 left-0 z-50`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/100x50" // Example logo, replace with your own logo
            alt="FITNEST"
            className="h-8 mr-3" // Adjusted logo height
          />
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="flex md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black focus:outline-none">
            {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>

        {/* Navigation Links for Desktop */}
        <ul className="hidden md:flex space-x-4 ml-auto items-center text-base"> {/* Reduced font size */}
          {[ 
            { href: '/home', label: 'Home', icon: <FaHome className="h-6 w-6" /> },
            { href: '/view-pricing', label: 'Pricing', icon: <FaDollarSign className="h-6 w-6" /> },
            { href: '/footer', label: 'Contact Us', icon: <FaEnvelope className="h-6 w-6" /> },
          ].map((link, idx) => (
            <li key={idx} className="group relative">
              <Link
                to={link.href}
                className="flex items-center text-black font-medium py-2 px-3 hover:text-[#6D4E90] transition duration-300"
              >
                <span className="mr-2">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
              <span className="absolute left-0 bottom-0 h-0.5 w-full bg-[#6D4E90] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
  <div className="md:hidden">
    <ul className="flex flex-col items-center space-y-6 mt-6 bg-white rounded-lg p-4 shadow-lg">
      {[ 
        { href: '/home', label: 'Home' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/footer', label: 'Contact Us' },
      ].map((link, idx) => (
        <li key={idx} className="group relative w-full">
          <Link
            to={link.href}
            className="block w-full text-black font-semibold py-3 px-6 rounded-md text-lg hover:bg-teal-700 hover:text-teal-200 transition-all duration-300"
          >
            {link.label}
          </Link>
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 h-0.5 w-3/4 bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
        </li>
      ))}
    </ul>
  </div>
)}
    </nav>
  );
};

export default Navbar;
