"use client";
import React, { useEffect, useState } from "react";
import { db, collection, getDocs } from "../source/firebase"; // Import Firebase functions
import ProfileDropdown from "./ProfileDropDown";
import { motion } from "framer-motion";

interface Mentee {
  id: string;
  name: string;
  progress: number;
  score: number;
}

const Profile = () => {
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [leaderboard, setLeaderboard] = useState<Mentee[]>([]);

  // Fetch mentee data from Firebase
  useEffect(() => {
    const fetchMentees = async () => {
      const querySnapshot = await getDocs(collection(db, "mentees"));
      const menteeList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Mentee[];

      setMentees(menteeList);
      setLeaderboard([...menteeList].sort((a, b) => b.score - a.score));
    };

    fetchMentees();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navbar */}
      <div className="flex justify-between items-center bg-white p-4 shadow rounded-lg">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <ProfileDropdown />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Progress Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Student Progress</h2>
          {mentees.map((mentee) => (
            <div key={mentee.id} className="mb-4">
              <p className="text-sm font-medium">{mentee.name}</p>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
                <motion.div
                  className="bg-blue-500 h-4 rounded-full"
                  style={{ width: `${mentee.progress}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${mentee.progress}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Leaderboard</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2">Rank</th>
                <th className="py-2">Name</th>
                <th className="py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((mentee, index) => (
                <tr key={mentee.id} className="border-b">
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2">{mentee.name}</td>
                  <td className="py-2">{mentee.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;