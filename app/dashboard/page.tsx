"use client";

import { useState } from "react";
import { FloatingDock } from "../../components/ui/floating-dock";

// Import your components
//import Chat from "../../components/Chat";
import Profile from "../../components/Profile";
import VideoCall from "../../components/VideoCall";

const dashboardItems = [
  { title: "Chat", icon: <div className="flex items-center justify-center w-full h-full">🗯️</div>, key: "chat" },
  { title: "Profile", icon: <div className="flex items-center justify-center w-full h-full">👤</div>, key: "profile" },
  { title: "Video Call", icon: <div className="flex items-center justify-center w-full h-full">📹</div>, key: "videocall" },
];

export default function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("profile"); // Default to Profile

  const renderComponent = () => {
    switch (activeComponent) {
      case "profile":
        return <Profile />;
      case "videocall":
        return <VideoCall />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-neutral-900">
      <main className="flex-1 w-full max-w-4xl p-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome to your dashboard! Use the navigation below.
        </p>

        {/* Render Active Component */}
        <div className="mt-6">{renderComponent()}</div>
      </main>

      <FloatingDock
        items={dashboardItems.map((item) => ({
          title: item.title,
          icon: item.icon,
          onClick: () => setActiveComponent(item.key),
        }))}
      />
    </div>
  );
}