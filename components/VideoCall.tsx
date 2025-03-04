"use client";

import React from "react";

const VideoCall = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <MeetEmbed />
    </div>
  );
};

const MeetEmbed = () => {
  return (
    <iframe
      src="https://meet.google.com/qfb-qjar-qhw"
      allow="camera; microphone; fullscreen"
      className="w-[90%] h-[80vh] border rounded-lg shadow-lg"
    ></iframe>
  );
};

export default VideoCall;
