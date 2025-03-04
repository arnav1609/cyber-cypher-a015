"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const FollowerPointerCard = ({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode;
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX + 10, y: e.clientY + 10 }); // Offset for better alignment
  };

  return (
    <div
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
      onMouseMove={handleMouseMove}
      className={`relative w-full h-full ${className}`}
    >
      <AnimatePresence>
        {isInside && <FollowPointer x={mousePos.x} y={mousePos.y} title={title} />}
      </AnimatePresence>
      {children}
    </div>
  );
};

export const FollowPointer = ({
  x,
  y,
  title,
}: {
  x: number;
  y: number;
  title?: string | React.ReactNode;
}) => {
  return (
    <motion.div
      className="fixed z-[9999] pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      {/* Cursor Icon (Slightly offset for better visibility) */}
      <svg
        stroke="currentColor"
        fill="currentColor"
        viewBox="0 0 16 16"
        className="h-6 w-6 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
      </svg>

      {/* Tooltip (Appears correctly aligned under cursor) */}
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 5 }}
        exit={{ opacity: 0, y: -5 }}
        className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg"
      >
        {title || "User"}
      </motion.div>
    </motion.div>
  );
};
