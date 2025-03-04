"use client";
import React, { useState } from "react";
import { db } from "../source/firebase";
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { FollowerPointerCard } from "./ui/following-pointer";

// Define interfaces for Mentor and Mentee documents
interface Mentor {
  id: string;
  name: string;
  email: string;
  expertise: string;
  experience: string;
  availability: string;
  communication: string;
  skills: string;
  expectations: string;
}

interface Mentee {
  id: string;
  name: string;
  email: string;
  interest: string;
  experienceLevel: string;
  availability: string;
  communication: string;
  skills: string;
  expectations: string;
}

const MentorMenteeForm: React.FC = () => {
  // State to choose between mentor and mentee
  const [selectedRole, setSelectedRole] = useState<"mentor" | "mentee" | null>(null);

  // State for mentee data
  const [menteeData, setMenteeData] = useState<Mentee>({
    id: "",
    name: "",
    email: "",
    interest: "",
    experienceLevel: "",
    availability: "",
    communication: "",
    skills: "",
    expectations: "",
  });

  // State for mentor data
  const [mentorData, setMentorData] = useState<Mentor>({
    id: "",
    name: "",
    email: "",
    expertise: "",
    experience: "",
    availability: "",
    communication: "",
    skills: "",
    expectations: "",
  });

  // Handlers for mentee form changes
  const handleMenteeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setMenteeData({ ...menteeData, [e.target.name]: e.target.value });
  };

  // Handlers for mentor form changes
  const handleMentorChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setMentorData({ ...mentorData, [e.target.name]: e.target.value });
  };

  // Submit handler for both forms
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (selectedRole === "mentee") {
        await addDoc(collection(db, "mentees"), menteeData);
        alert("Mentee profile submitted successfully!");
      } else if (selectedRole === "mentor") {
        await addDoc(collection(db, "mentors"), mentorData);
        alert("Mentor profile submitted successfully!");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // For mentees: find the best matching mentor based on simple scoring
  const findBestMentor = async () => {
    if (selectedRole !== "mentee") return;

    const mentorsSnapshot = await getDocs(collection(db, "mentors"));
    // Map each document to a Mentor object explicitly
    const mentors: Mentor[] = mentorsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "",
        email: data.email || "",
        expertise: data.expertise || "",
        experience: data.experience || "",
        availability: data.availability || "",
        communication: data.communication || "",
        skills: data.skills || "",
        expectations: data.expectations || "",
      };
    });

    if (mentors.length === 0) {
      alert("No mentors available. Please try again later.");
      return;
    }

    let bestMatch: Mentor | null = null;
    let maxScore = 0;

    // Use a for…of loop for proper type narrowing
    for (const mentor of mentors) {
      let score = 0;
      if (mentor.expertise === menteeData.interest) score += 3;
      if (mentor.availability === menteeData.availability) score += 2;
      if (mentor.communication === menteeData.communication) score += 2;
      if (score > maxScore) {
        maxScore = score;
        bestMatch = mentor;
      }
    }

    // Use explicit if/else to ensure bestMatch is properly narrowed
    if (bestMatch === null) {
      await addDoc(collection(db, "matches"), {
        mentee: menteeData.name,
        menteeEmail: menteeData.email,
        mentor: "Jason Dsouza",
        mentorEmail: "jason.dsouza.here@gmail.com",
      });
      alert("Mentor Assigned: Jason Dsouza");
    } else {
      await addDoc(collection(db, "matches"), {
        mentee: menteeData.name,
        menteeEmail: menteeData.email,
        mentor: bestMatch.name,
        mentorEmail: bestMatch.email,
      });
      alert(`Mentor Assigned: ${bestMatch.name}`);
    }
  };

  // Example function to update an existing mentee document
  const updateMenteeData = async (menteeId: string, newData: Partial<Mentee>) => {
    try {
      const menteeRef = doc(db, "mentees", menteeId);
      await updateDoc(menteeRef, newData);
      console.log("Mentee data updated successfully");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <FollowerPointerCard title="Hover Me">
      <div className="max-w-lg mx-auto mt-10 p-5 bg-white rounded-lg shadow-md">
        {/* Role Selection */}
        {!selectedRole ? (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold mb-4">Select Your Role</h2>
            <button
              onClick={() => setSelectedRole("mentee")}
              className="bg-green-500 text-white p-2 rounded"
            >
              I am a Mentee
            </button>
            <button
              onClick={() => setSelectedRole("mentor")}
              className="bg-blue-500 text-white p-2 rounded"
            >
              I am a Mentor
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">
              {selectedRole === "mentee" ? "Mentee Registration" : "Mentor Registration"}
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={selectedRole === "mentee" ? menteeData.name : mentorData.name}
                onChange={selectedRole === "mentee" ? handleMenteeChange : handleMentorChange}
                className="w-full p-2 border mb-2"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={selectedRole === "mentee" ? menteeData.email : mentorData.email}
                onChange={selectedRole === "mentee" ? handleMenteeChange : handleMentorChange}
                className="w-full p-2 border mb-2"
                required
              />
              {selectedRole === "mentee" ? (
                <>
                  <input
                    type="text"
                    name="interest"
                    placeholder="Field of Interest"
                    value={menteeData.interest}
                    onChange={handleMenteeChange}
                    className="w-full p-2 border mb-2"
                    required
                  />
                  <select
                    name="experienceLevel"
                    value={menteeData.experienceLevel}
                    onChange={handleMenteeChange}
                    className="w-full p-2 border mb-2"
                    required
                  >
                    <option value="">Current Experience Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    name="expertise"
                    placeholder="Field of Expertise"
                    value={mentorData.expertise}
                    onChange={handleMentorChange}
                    className="w-full p-2 border mb-2"
                    required
                  />
                  <input
                    type="number"
                    name="experience"
                    placeholder="Years of Experience"
                    value={mentorData.experience}
                    onChange={handleMentorChange}
                    className="w-full p-2 border mb-2"
                    required
                  />
                </>
              )}
              <input
                type="text"
                name="availability"
                placeholder="Availability (hours per week)"
                value={selectedRole === "mentee" ? menteeData.availability : mentorData.availability}
                onChange={selectedRole === "mentee" ? handleMenteeChange : handleMentorChange}
                className="w-full p-2 border mb-2"
                required
              />
              <select
                name="communication"
                value={selectedRole === "mentee" ? menteeData.communication : mentorData.communication}
                onChange={selectedRole === "mentee" ? handleMenteeChange : handleMentorChange}
                className="w-full p-2 border mb-2"
                required
              >
                <option value="">Preferred Communication Mode</option>
                <option value="Video Call">Video Call</option>
                <option value="Chat">Chat</option>
                <option value="Email">Email</option>
              </select>
              <input
                type="text"
                name="skills"
                placeholder={selectedRole === "mentee" ? "Skills You Want to Develop" : "Skills You Can Teach"}
                value={selectedRole === "mentee" ? menteeData.skills : mentorData.skills}
                onChange={selectedRole === "mentee" ? handleMenteeChange : handleMentorChange}
                className="w-full p-2 border mb-2"
                required
              />
              <textarea
                name="expectations"
                placeholder={
                  selectedRole === "mentee"
                    ? "What do you expect from a mentor?"
                    : "What do you expect from mentees?"
                }
                value={selectedRole === "mentee" ? menteeData.expectations : mentorData.expectations}
                onChange={selectedRole === "mentee" ? handleMenteeChange : handleMentorChange}
                className="w-full p-2 border mb-2"
                required
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                Submit
              </button>
              {selectedRole === "mentee" && (
                <button
                  type="button"
                  onClick={findBestMentor}
                  className="bg-green-500 text-white p-2 rounded w-full mt-2"
                >
                  Find Mentor
                </button>
              )}
            </form>
          </>
        )}
      </div>
    </FollowerPointerCard>
  );
};

export default MentorMenteeForm;
