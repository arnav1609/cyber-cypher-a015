import React, { useState } from "react";
import { db } from "../source/firebase"; 
import { collection, addDoc } from "firebase/firestore";

const MentorForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    expertise: "",
    experience: "",
    availability: "",
    communication: "",
    skills: "",
    expectations: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "mentors"), formData);
      alert("Mentor profile submitted successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Mentor Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border mb-2" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border mb-2" required />
        <input type="text" name="expertise" placeholder="Field of Expertise" value={formData.expertise} onChange={handleChange} className="w-full p-2 border mb-2" required />
        <input type="number" name="experience" placeholder="Years of Experience" value={formData.experience} onChange={handleChange} className="w-full p-2 border mb-2" required />
        <input type="number" name="availability" placeholder="Availability (hours per week)" value={formData.availability} onChange={handleChange} className="w-full p-2 border mb-2" required />
        <select name="communication" value={formData.communication} onChange={handleChange} className="w-full p-2 border mb-2" required>
          <option value="">Preferred Communication Mode</option>
          <option value="Video Call">Video Call</option>
          <option value="Chat">Chat</option>
          <option value="Email">Email</option>
        </select>
        <input type="text" name="skills" placeholder="Skills You Can Teach" value={formData.skills} onChange={handleChange} className="w-full p-2 border mb-2" required />
        <textarea name="expectations" placeholder="What do you expect from mentees?" value={formData.expectations} onChange={handleChange} className="w-full p-2 border mb-2" required />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Submit</button>
      </form>
    </div>
  );
};

export default MentorForm;