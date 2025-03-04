"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaUsers, FaSignOutAlt } from "react-icons/fa";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Profile Icon /}
      <button
        className="flex items-center space-x-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaUser className="text-gray-700 text-xl" />
      </button>

      {/ Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-50">
          <ul className="py-2">
            <li
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleNavigation("/profile")}
            >
              <FaUser className="mr-2 text-gray-600" />
              Your Profile
            </li>
            <li
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleNavigation("/mentees")}
            >
              <FaUsers className="mr-2 text-gray-600" />
              Your Mentees
            </li>
            <hr />
            <li
              className="flex items-center px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
              onClick={() => alert("Logging out...")} // Replace with logout logic
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;