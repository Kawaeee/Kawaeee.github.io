"use client";

import React, { useState } from "react";
import FloatingBox from "../components/FloatingBox";

export default function Home() {
  const [boxes, setBoxes] = useState<{ id: string; position: { x: number; y: number } }[]>([]);
  const [zIndexes, setZIndexes] = useState<{ [key: string]: number }>({});

  // Helper: Generate random positions within the screen bounds
  const getRandomPosition = () => ({
    x: Math.floor(Math.random() * (window.innerWidth - 300)),
    y: Math.floor(Math.random() * (window.innerHeight - 200)),
  });

  // Helper: Generate a random z-index between 11 and 30
  const getRandomZIndex = () => Math.floor(Math.random() * 20) + 11;

  // Open a new box or bring an existing one to the front
  const openBox = (id: string) => {
    setBoxes((prev) => {
      if (prev.find((box) => box.id === id)) return prev; // Prevent duplicate boxes
      return [...prev, { id, position: getRandomPosition() }];
    });

    setZIndexes((prev) => ({
      ...prev,
      [id]: getRandomZIndex(),
    }));
  };

  // Bring a box to the front by setting the highest z-index
  const bringToFront = (id: string) => {
    setZIndexes((prev) => ({
      ...prev,
      [id]: Math.max(...Object.values(prev), 30) + 1,
    }));
  };

  // Close a box and clean up its z-index
  const closeBox = (id: string) => {
    setBoxes((prev) => prev.filter((box) => box.id !== id));
    setZIndexes((prev) => {
      const { [id]: _, ...rest } = prev; // Remove the z-index for the closed box
      return rest;
    });
  };

  return (
    <div className="h-screen bg-black text-white flex overflow-hidden relative">
      {/* Name Box */}
      <div className="fixed top-6 left-6 bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-lg z-10">
        <h1 className="text-3xl font-bold">KASIDECH CHUMKUN</h1>
      </div>

      {/* Navigation */}
      <aside className="fixed top-24 left-6 bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-lg z-10">
        <nav className="space-y-4">
          {["about", "experiences", "projects"].map((section) => (
            <button
              key={section}
              onClick={() => openBox(section)}
              className="text-lg block hover:text-pink-500 transition-colors duration-300"
            >
              {section.toUpperCase()}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-1/4 w-full relative">
        {boxes.map((box) => (
          <FloatingBox
            key={box.id}
            id={box.id}
            onClose={closeBox}
            onFocus={bringToFront}
            zIndex={zIndexes[box.id] || 0}
            position={box.position}
          />
        ))}
      </div>
    </div>
  );
}
