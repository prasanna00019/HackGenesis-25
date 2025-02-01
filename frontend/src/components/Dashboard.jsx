import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  MessageSquare,
  Gamepad2,
  Book,
  Smile,
  StretchHorizontal,
  PenTool,
  Music2,
  User2Icon,
} from "lucide-react";
import AngerManagementTest from "./AngerManagementTest";
import DepressionTest from "./DepressionTest";
import SocialAnxietyTest from "./SocialAnxietyTest";
import EmotionalStabilityTest from "./EmotionalStabilityTest";
import ADHDTest from "./ADHDTest";
import AISupportChatbot from "./AISupportChatbot";
import AffirmationGame from "./AffirmationGame";
import MemoryGame from "./MemoryGame";
import Blogs from "./Blogs";
import GratitudeJournal from "./GratitudeJournal";
import Meditation from "./Meditation";
import Yoga from "./Yoga";
import EmotionalJournal from "./EmotionalJournal";
import Chants from "./Chants";
import { useAuthContext } from "../context/Authcontext";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState(""); // Track active section
  const navigate = useNavigate();
  const {Authuser}=useAuthContext();
  const sections = [
    { id: "stressTest", label: "Test", icon: Activity },
    { id: "aiSupport", label: "AI Support", icon: MessageSquare },
    { id: "games", label: "Games", icon: Gamepad2 },
    { id: "gratitudeJournal", label: "Gratitude Journal", icon: Book },
    { id: "emotionalJournal", label: "Emotional Journal", icon: Smile },
    { id: "yogaSection", label: "Yoga Section", icon: StretchHorizontal },
    { id: "meditationSection", label: "Meditation Section", icon: Activity },
    { id: "blogs", label: "Blogs", icon: PenTool },
    { id: "chantsSection", label: "Chants Section", icon: Music2 },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "stressTest":
        return (
          <div className="max-h-screen max-w-screen  flex flex-col gap-2 overflow-auto">
            <AngerManagementTest /> <DepressionTest />
            <EmotionalStabilityTest /> <SocialAnxietyTest /> <ADHDTest />
          </div>
        );

      case "aiSupport":
        return <AISupportChatbot/>;
      case "games":
        return (
          <div className="max-h-screen  w-full overflow-auto">
            <AffirmationGame /> <MemoryGame />
          </div>
        );
      case "gratitudeJournal":
        return <GratitudeJournal/>;
      case "emotionalJournal":
        return <EmotionalJournal/>;
      case "yogaSection":
        return <Yoga />;
      case "meditationSection":
        return <Meditation/>;
      case "blogs":
        return <Blogs/>;
      case "chantsSection":
        return <Chants/>;
      default:
        return <p>Select a section from the sidebar</p>;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div className="p-5 flex flex-col justify-between items-start h-screen w-[20%] bg-pink-300">
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

        <div className="my-6">
          {sections.map((menu) => {
            const Icon = menu.icon; // Get the icon component
            return (
              <div
                key={menu.id}
                className="py-2 w-full flex items-center gap-3 cursor-pointer hover:text-lg hover:font-semibold transition-all"
                onClick={() => setActiveSection(menu.id)} // Set the active section
              >
                {Icon && <Icon className="w-5 h-5 text-gray-800" />} {/* Render icon if available */}
                <span className="text-gray-800">{menu.label}</span>
              </div>
            );
          })}
        </div>

        <div className="">
          <div className="py-2 w-full flex items-center gap-3 cursor-pointer hover:text-lg hover:font-semibold transition-all">
            <User2Icon className="w-5 h-5" />
            <span>{Authuser.email}</span>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ flex: 1, padding: "2rem" }}>{renderContent()}</div>
    </div>
  );
};

export default Dashboard;
