// components/Login.tsx
"use client";

import React, { useState } from "react";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (activeTab === "signup") {
      // Optionally: call your signup API here to store the user's email and password
      console.log("Signing up with", { email, password });
      // On successful sign-up, navigate to the Questionnaire page
      router.push("/questionnaire");
    } else {
      // Optionally: call your login API here
      console.log("Logging in with", { email, password });
      // On successful login, navigate to the Dashboard page
      router.push("/dashboard");
    }
  };

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
        {/* Tab Buttons */}
        <div className="flex mb-4">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 p-2 text-center ${
              activeTab === "login" ? "border-b-2 border-black" : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 p-2 text-center ${
              activeTab === "signup" ? "border-b-2 border-black" : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>
        <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
          {activeTab === "login" ? "Login" : "Sign Up"}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {activeTab === "login"
            ? "Enter your credentials to access your account."
            : "Create a new account by filling in your details."}
        </CardItem>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              {activeTab === "login" ? "Login" : "Sign Up"}
            </button>
          </div>
        </form>
      </CardBody>
    </CardContainer>
  );
}
