
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
// import bgImage from '../assets/image.png'; 
// import Navbar from '../components/Navbar';
// import Footer from "../components/Footer";
import { useAuthContext } from "../../context/Authcontext";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setAuthuser } = useAuthContext();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        setLoading(false);
        localStorage.setItem("mental-health-user", JSON.stringify(result));
        setAuthuser(result);
        toast.success("Login successful!", {
          position: "top-center",
          duration: 5000,
        });
        navigate("/home");
      } else {
        setLoading(false);
        toast.error(result.message || "Login failed");
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
    <div className="w-full">
        {/* <Navbar /> */}
      </div>
    <div className="relative min-h-screen bg-cover bg-fixed"
      style={{
        // backgroundImage: `url(${bgImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}>
      <Toaster />

     

      <div
    className="relative z-10 flex items-center justify-center min-h-screen bg-opacity-40"
  >
     <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-lg w-full transform translate-x-[-35%] ">
      
     
      

      {/* Login Form title in larger font */}
      <h1 className="text-2xl font-extrabold text-[#303F9F] mb-6 text-center">Login</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="admin_user"
            className="block text-gray-700 mb-2 font-medium text-base"
          >
           
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="admin_password"
            className="block text-gray-700 mb-2 font-medium text-base"
          >
           
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="flex justify-between mb-4">
          <Link to="/signup" className="text-xs text-gray-800 hover:underline">
            Don’t have an account? Sign up
          </Link>
          <div
            onClick={() => navigate(`/forgot-password`)}
            className="text-xs text-blue-900 hover:underline cursor-pointer"
          >
            Forgot Password?
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-3 bg-[#F6B5AD] text-white font-semibold rounded-lg hover:bg-[#E78E81] transition duration-300 text-sm ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  </div>
</div>
{/* <Footer path='/footer' />  */}
</>
  );
};

export default Login;
