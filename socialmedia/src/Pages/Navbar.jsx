import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Search from "./Search.jsx";
import {
  FaInstagram,
  FaHome,
  FaSearch,
  FaCompass,
  FaVideo,
  FaEnvelope,
  FaBell,
  FaPlusSquare,
  FaUser,
  FaRobot,
  FaPaintBrush,
} from "react-icons/fa";
import { SiThreads } from "react-icons/si";
import { useSelector } from "react-redux";
import profile from "../asset/profile.jpg"

const LeftNavbar = () => {
  const user = useSelector((state) => state.user.user);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-black text-white flex flex-col border-r border-gray-800 transition-all duration-300
        ${isSearchOpen ? "w-26" : "w-64"} p-5`}
    >
      {/* Logo */}
      <div className="flex items-center mb-8">
        <FaInstagram className="text-3xl " />
        {!isSearchOpen && (
          <span className="text-2xl ml-4 font-['Lobster']">Pourush</span>
        )}
      </div>

      {/* Menu */}
      <ul className="space-y-3">
        <NavLink
          to="/front"
          className="flex  items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
          onClick={() => setIsSearchOpen(false)}
        >
          <FaHome className="text-2xl " />
          {!isSearchOpen && <span className="text-lg ml-4">Home</span>}
        </NavLink>

        {/* Search */}
        <li
          className="flex items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <FaSearch className="text-2xl " />
          {!isSearchOpen && <span className="text-lg ml-4">Search</span>}
        </li>

        <li className="flex items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <FaCompass className="text-2xl " />
          {!isSearchOpen && <span className="text-lg ml-4">Explore</span>}
        </li>

        <li className="flex items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <FaVideo className="text-2xl " />
          {!isSearchOpen && <span className="text-lg ml-4">Reels</span>}
        </li>

        <li className="flex items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <FaEnvelope className="text-2xl " />
          {!isSearchOpen && <span className="text-lg ml-4">Messages</span>}
        </li>

        <li className="flex items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <FaBell className="text-2xl " />
          {!isSearchOpen && <span className="text-lg ml-4">Notifications</span>}
        </li>

        <li className="flex items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <FaPlusSquare className="text-2xl " />
          {!isSearchOpen && <span className="text-lg ml-4">Create</span>}
        </li>

        <NavLink
          to="/front/profile"
          className="flex items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
          onClick={() => setIsSearchOpen(false)}
        >
          <img
            src={user.avatar || profile}
            className="w-8 h-8  rounded-full  border-1 p-[1px] border-white"
            alt=""
          />
          {!isSearchOpen && <span className="text-lg ml-2">Profile</span>}
        </NavLink>

        <li className="flex items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <FaRobot className="text-2xl " />
          {!isSearchOpen && <span className="text-lg ml-4">Meta AI</span>}
        </li>
        <li className="flex items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <FaPaintBrush className="text-2xl " />
          {!isSearchOpen && <span className="text-lg ml-4">AI Studio</span>}
        </li>
        <li className="flex items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <SiThreads className="text-2xl " />
          {!isSearchOpen && <span className="text-lg ml-4">Threads</span>}
        </li>
      </ul>

      {/* Search Panel */}
      {isSearchOpen && <Search setIsSearchOpen={setIsSearchOpen} />}
    </div>
  );
};

export default LeftNavbar;