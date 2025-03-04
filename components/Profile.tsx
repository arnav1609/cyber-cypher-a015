"use client";

import React, { useEffect, useState } from "react";
import { db, collection, getDocs } from "../source/firebase";
import ProfileDropdown from "./ProfileDropDown";
import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export { db };

interface Mentee {
  id: string;
  name: string;
  profilePic: string;
  progress: number;
  score: number;
  mentors: string[];
}

const Profile = () => {
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [leaderboard, setLeaderboard] = useState<Mentee[]>([]);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 p-6">
      <div className="flex justify-between items-center bg-white p-4 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-indigo-700">Dashboard</h1>
        <ProfileDropdown />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {mentees.map((mentee) => (
          <Card key={mentee.id} className="bg-white p-6 rounded-lg shadow-xl">
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 rounded-full border-4 border-indigo-500" src={mentee.profilePic} />
              <h2 className="text-xl font-semibold mt-4 text-indigo-800">{mentee.name}</h2>
              <p className="text-sm text-gray-600">Mentors: {mentee.mentors.join(", ")}</p>

              <div className="w-full bg-gray-200 rounded-full h-4 mt-3 overflow-hidden">
                <motion.div
                  className="bg-green-500 h-4 rounded-full"
                  style={{ width: `${mentee.progress}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${mentee.progress}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <p className="text-sm font-medium mt-2">Progress: {mentee.progress}%</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-xl mt-6">
        <h2 className="text-xl font-semibold mb-4 text-indigo-800">Leaderboard</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-indigo-100">
              <th className="py-2 px-4">Rank</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((mentee, index) => (
              <tr key={mentee.id} className="border-b hover:bg-indigo-50">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{mentee.name}</td>
                <td className="py-2 px-4">{mentee.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;

