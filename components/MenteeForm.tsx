import React, { useState } from "react";
import { db } from "../source/firebase"; 
import { collection, addDoc } from "firebase/firestore";

// Define the shape of our form data
interface FormData {
  name: string;
  email: string;
  interest: string;
  experienceLevel: string;
  availability: string;
  communication: string;
  skills: string;
  expectations: string;
}

const MenteeForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    interest: "",
    experienceLevel: "",
    availability: "",
    communication: "",
    skills: "",
    expectations: "",
  });

  // Type event as a change event on input, select, or textarea elements
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Type the submit event as a form event on an HTMLFormElement
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "mentees"), formData);
      alert("Mentee profile submitted successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Mentee Registration</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={formData.name} 
          onChange={handleChange} 
          className="w-full p-2 border mb-2" 
          required 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          className="w-full p-2 border mb-2" 
          required 
        />
        <input 
          type="text" 
          name="interest" 
          placeholder="Field of Interest" 
          value={formData.interest} 
          onChange={handleChange} 
          className="w-full p-2 border mb-2" 
          required 
        />
        <select 
          name="experienceLevel" 
          value={formData.experienceLevel} 
          onChange={handleChange} 
          className="w-full p-2 border mb-2" 
          required
        >
          <option value="">Current Experience Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <input 
          type="number" 
          name="availability" 
          placeholder="Availability (hours per week)" 
          value={formData.availability} 
          onChange={handleChange} 
          className="w-full p-2 border mb-2" 
          required 
        />
        <select 
          name="communication" 
          value={formData.communication} 
          onChange={handleChange} 
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
          placeholder="Skills You Want to Develop" 
          value={formData.skills} 
          onChange={handleChange} 
          className="w-full p-2 border mb-2" 
          required 
        />
        <textarea 
          name="expectations" 
          placeholder="What do you expect from a mentor?" 
          value={formData.expectations} 
          onChange={handleChange} 
          className="w-full p-2 border mb-2" 
          required 
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MenteeForm;
