import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // For managing messages
  const { emailToChange } = useParams();
  const navigate = useNavigate();
  const showMessage = (msg, type = "error") => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(null), 8000); // Message disappears after 8 seconds
  };
  // Send OTP to the email
  const sendOtp = async () => {
    try {
      setLoading(true);
      await axios.post("https://www.fit-nest.in/api/auth/send-otp", {
        email: emailToChange ? emailToChange : email,
        reason: "forgot-password",
      }, {
        withCredentials: true
      });
      setOtpSent(true);
      setLoading(false);
      showMessage("OTP sent to your email.", "success");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setLoading(false);
      showMessage("Error sending OTP. Please try again.");
    }
  };
  // Verify the OTP
  const verifyOtp = async () => {
    try {
      const response = await axios.post("https://www.fit-nest.in/api/auth/verify-otp", {
        email: emailToChange ? emailToChange : email,
        otp,

      }, { withCredentials: true });
      if (response.data.verified) {
        setOtpVerified(true);
        showMessage("OTP verified. You can now reset your password.", "success");
      } else {
        showMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      showMessage("Error verifying OTP. Please try again.");
    }
  };

  // Handle password reset
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      showMessage("Passwords do not match. Please try again.");
      return;
    }

    try {
      await axios.post("https://www.fit-nest.in/api/auth/reset-password", {
        email: emailToChange ? emailToChange : email,
        newPassword,
      }, { withCredentials: true });
      showMessage("Password reset successfully! You can now log in.", "success");
      navigate("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
      showMessage("Error resetting password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-black p-6 rounded-lg shadow-lg w-96 border border-green-500"
        style={{ boxShadow: "0 0 15px 2px rgb(47, 112, 47)" }}
      >
        <h1 className="text-3xl font-extrabold text-center text-green-600 mb-4">
          Forgot Password
        </h1>

        {/* Displaying message if any */}
        {message && (
          <div
            className={`p-2 mb-4 text-sm rounded-md ${message.type === "success" ? "text-green-600" : "text-red-600"}`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-4">
          {!otpVerified && (
            <>
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-green-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-white border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
                  value={emailToChange ? emailToChange : email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!!emailToChange}
                />
              </div>
              {!otpSent && (
                <button
                  onClick={sendOtp}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              )}

              {/* OTP Input */}
              {otpSent && (
                <div>
                  <label className="block text-sm font-medium text-green-600 mb-1">
                    OTP
                  </label>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    className="w-full px-4 py-2 bg-white border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button
                    onClick={verifyOtp}
                    className="w-full bg-green-600 text-white py-2 rounded-lg mt-2 hover:bg-green-700 transition duration-200"
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
              )}
            </>
          )}

          {/* Reset Password Fields */}
          {otpVerified && (
            <>
              <div>
                <label className="block text-sm font-medium text-green-600 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full px-4 py-2 bg-white border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-green-600 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full px-4 py-2 bg-white border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                onClick={handleResetPassword}
                className="w-full bg-green-600 text-white py-2 rounded-lg mt-4 hover:bg-green-700 transition duration-200"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
