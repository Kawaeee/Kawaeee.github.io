"use client";

import React, { useState } from "react";
import FloatingBox from "./components/FloatingBox";
import About from "./pages/About";
import Experiences from "./pages/Experiences";
import Projects from "./pages/Projects";

export default function Home() {
  const [boxes, setBoxes] = useState<{ id: string; position: { x: number; y: number } }[]>([]);
  const [zIndexes, setZIndexes] = useState<{ [key: string]: number }>({});

  // Helper: Generate random positions within the screen bounds
  const getRandomPosition = () => {
    const margin = 20; // Minimum margin from the screen edges
    const boxWidth = 300; // Assumed box width
    const boxHeight = 200; // Assumed box height

    return {
      x: Math.max(
        margin,
        Math.min(
          Math.random() * (window.innerWidth - boxWidth - margin),
          window.innerWidth - boxWidth - margin
        )
      ),
      y: Math.max(
        margin,
        Math.min(
          Math.random() * (window.innerHeight - boxHeight - margin),
          window.innerHeight - boxHeight - margin
        )
      ),
    };
  };

  const openBox = (id: string) => {
    setBoxes((prev) => {
      if (prev.some((box) => box.id === id)) return prev; // Prevent duplicate boxes
      return [...prev, { id, position: getRandomPosition() }];
    });

    setZIndexes((prev) => {
      const maxZIndex = Math.max(...Object.values(prev), 10);
      return { ...prev, [id]: maxZIndex + 1 };
    });
  };

  const closeBox = (id: string) => {
    setBoxes((prev) => prev.filter((box) => box.id !== id));
    setZIndexes((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const getContentComponent = (id: string) => {
    switch (id) {
      case "about":
        return <About />;
      case "experiences":
        return <Experiences />;
      case "projects":
        return <Projects />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen text-white flex overflow-hidden relative">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="fixed top-0 left-0 w-full h-full object-cover z-[-1]">
        <source src="/images/loop.webm" type="video/webm" />
      </video>

      {/* Name Box */}
      <div
        className="fixed top-16 left-12 bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg z-10 name-box transition-all duration-500 animate-slideIn"
      >
        <h1 className="text-center text-gray-100 font-nanoline-solid leading-tight break-words text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          KASIDECH CHUMKUN
        </h1>
      </div>

      {/* Navigation */}
      <aside
        className="fixed top-44 left-12 bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg z-10 menu-box transition-all duration-500 animate-slideIn"
      >
        <nav className="space-y-4">
          {["about", "experiences", "projects"].map((section) => (
            <button
              key={section}
              onClick={() => openBox(section)}
              className="text-xl sm:text-md md:text-lg lg:text-xl font-nanoline-regular block transition-colors duration-300 hover:text-pink-500"
            >
              {section.toUpperCase()}
            </button>
          ))}
        </nav>
      </aside>

      {/* Floating Boxes */}
      <div className="relative w-full ml-1/4">
        {boxes.map((box) => (
          <FloatingBox
            key={box.id}
            id={box.id}
            onClose={closeBox}
            zIndex={zIndexes[box.id] || 0}
            position={box.position}
            content={getContentComponent(box.id)}
          />
        ))}
      </div>
    </div>
  );
}
