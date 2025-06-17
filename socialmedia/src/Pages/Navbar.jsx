// LeftNavbar.jsx
import React from 'react';

// FontAwesome icons for Instagram-like icons
import { FaInstagram, FaHome, FaSearch, FaCompass, FaVideo, FaEnvelope, FaBell, FaPlusSquare, FaUser, FaRobot, FaPaintBrush } from 'react-icons/fa';
import { SiThreads } from 'react-icons/si'; // Threads icon

const LeftNavbar = () => {
  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-black text-white flex flex-col p-5 border-r border-gray-800">
      {/* Instagram Logo */}
      <div className="flex items-center mb-8">
        <FaInstagram className="text-3xl mr-2" />
        <span className="text-2xl font-['Lobster']">Pourush</span>
      </div>

      {/* Navigation Menu */}
      <ul className="space-y-3">
        <li className="flex items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <FaHome className="text-2xl mr-4" />
          <span className="text-lg">Home</span>
        </li>
        <li className="flex items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <FaSearch className="text-2xl mr-4" />
          <span className="text-lg">Search</span>
        </li>
        <li className="flex items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <FaCompass className="text-2xl mr-4" />
          <span className="text-lg">Explore</span>
        </li>
        <li className="flex items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <FaVideo className="text-2xl mr-4" />
          <span className="text-lg">Reels</span>
        </li>
        <li className="flex items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <FaEnvelope className="text-2xl mr-4" />
          <span className="text-lg">Messages</span>
          {/* <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1"></span> */}
        </li>
        <li className="flex items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <FaBell className="text-2xl mr-4" />
          <span className="text-lg">Notifications</span>
        </li>
        <li className="flex items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <FaPlusSquare className="text-2xl mr-4" />
          <span className="text-lg">Create</span>
        </li>
        <li className="flex items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <FaUser className="text-2xl mr-4" />
          <span className="text-lg">Profile</span>
        </li>
        <li className="flex items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <FaRobot className="text-2xl mr-4" />
          <span className="text-lg">Meta AI</span>
        </li>
        <li className="flex items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <FaPaintBrush className="text-2xl mr-4" />
          <span className="text-lg">AI Studio</span>
        </li>
        <li className="flex items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <SiThreads className="text-2xl mr-4" />
          <span className="text-lg">Threads</span>
        </li>
      </ul>
    </div>
  );
};

export default LeftNavbar;