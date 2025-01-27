import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className="bg-[#F9F6F6] text-[#333333] py-8 px-8">
      <div className="container mx-auto text-center">
        {/* Footer Header */}
        <h2 className="text-3xl font-extrabold mb-4 tracking-wide leading-tight text-[#6D4E90]">
          Get in Touch with Us
        </h2>
        <p className="text-lg mb-8 text-[#5C476B] leading-relaxed max-w-3xl mx-auto">
          Feel free to contact us for any inquiries, plans, or feedback! We're
          always here to assist you.
        </p>

        {/* Footer Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#6D4E90]">
              Contact Information
            </h3>
            <ul className="space-y-3 text-[#444444] text-lg">
              <li className="flex items-center gap-3">
                <i className="fas fa-envelope text-[#6D4E90] text-xl"></i>
                <a
                  href="mailto:fitnest@example.com"
                  className="hover:text-[#A084DC] transition-colors"
                >
                  fitnest@example.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-phone-alt text-[#6D4E90] text-xl"></i>
                <a
                  href="tel:+1234567890"
                  className="hover:text-[#A084DC] transition-colors"
                >
                  +1 234 567 890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-map-marker-alt text-[#6D4E90] text-xl"></i>
                <p>123 Fitness Street, Gym City, 12345</p>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#6D4E90]">
              Follow Us
            </h3>
            <div className="flex justify-center gap-4 mt-4">
              <a
                href="https://facebook.com/fitnest"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl hover:text-[#A084DC] transition-colors"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="https://instagram.com/fitnest"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl hover:text-[#A084DC] transition-colors"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://linkedin.com/company/fitnest"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl hover:text-[#A084DC] transition-colors"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Send Us a Message Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#6D4E90]">
              Send Us a Message
            </h3>
            <form className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full px-6 py-3 rounded-lg bg-[#F4EBE8] text-[#6D4E90] border border-[#E2D7D3] placeholder-[#A084DC] focus:ring-2 focus:ring-[#A084DC] transition duration-300 text-lg"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                className="w-full px-6 py-3 rounded-lg bg-[#F4EBE8] text-[#6D4E90] border border-[#E2D7D3] placeholder-[#A084DC] focus:ring-2 focus:ring-[#A084DC] transition duration-300 text-lg"
                rows="4"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#A084DC] to-[#6D4E90] text-white py-3 px-6 rounded-lg hover:opacity-90 transition duration-300 text-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <hr className="border-t border-[#E2D7D3] mt-4" />
        <div className="text-[#6D4E90] text-sm mt-4">
          <p>
            © 2024 FitNest Gym. All rights reserved. Powered by Gym CRM
            Technologies.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
