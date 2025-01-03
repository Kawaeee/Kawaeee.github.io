"use client";

import React, { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";

const FloatingBox = ({
  id,
  onClose,
  onFocus,
  zIndex,
  position: initialPosition,
}: {
  id: string;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  zIndex: number;
  position: { x: number; y: number };
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true); // New state for open animation
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAnimating(false);
      setIsOpen(false); // Reset open animation after it plays
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  const toggleMinimize = () => {
    setIsMaximized(false);
    setIsMinimized((prev) => !prev);
  };

  const toggleMaximize = () => {
    setIsMinimized(false);
    setIsMaximized((prev) => !prev);
  };

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => onClose(id), 300);
  };

  const animationClass = isAnimating
    ? isOpen
      ? "animate-open"
      : isMinimized
      ? "animate-minimize"
      : isMaximized
      ? "animate-maximize"
      : "animate-close"
    : "";

  // Dynamic styles
  const boxStyles: React.CSSProperties = {
    position: "fixed",
    top: isMaximized ? "20px" : `${initialPosition.y}px`,
    left: isMaximized ? "20px" : `${initialPosition.x}px`,
    width: isMaximized ? "calc(100vw - 40px)" : "16rem",
    height: isMaximized ? "calc(100vh - 40px)" : "10rem",
    zIndex,
    borderRadius: isMaximized ? "0" : "15px",
    margin: 0,
    padding: 0,
    boxShadow: isMaximized
      ? "0 8px 20px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0)"
      : "0 4px 15px rgba(0, 0, 0, 0.3)",
    transition: isDragging
      ? "none"
      : isMaximized || isAnimating || isMinimized
      ? "all 0.3s ease-in-out"
      : "none",
  };

  return (
<Draggable
  nodeRef={nodeRef}
  disabled={isMaximized} // Disable dragging when maximized
  bounds={!isMaximized ? "parent" : undefined}
  position={isMaximized ? { x: 0, y: 0 } : undefined}
  handle=".handle" // Make the title bar the drag handle
  onStart={() => {
    setIsDragging(true);
    onFocus(id);
  }}
  onStop={() => setIsDragging(false)}
>
  <div
    ref={nodeRef}
    style={boxStyles}
    className={`bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg ${animationClass}`}
  >
    {/* Title Bar */}
    <div className="handle bg-gray-700 flex justify-between items-center p-2 cursor-move rounded-t-lg">
      <span className="font-nanoline-solid">{id.toUpperCase()}</span>
      <div className="flex space-x-2">
        <button
          onClick={toggleMinimize}
          disabled={isMinimized} // Disable if already minimized
          className={`w-4 h-4 rounded-full transition-transform ${
            isMinimized
              ? "bg-yellow-400 cursor-not-allowed"
              : "bg-yellow-400 hover:scale-110"
          }`}
        />
        <button
          onClick={toggleMaximize}
          disabled={isMaximized} // Disable if already maximized
          className={`w-4 h-4 rounded-full transition-transform ${
            isMaximized
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-400 hover:scale-110"
          }`}
        />
        <button
          onClick={handleClose}
          className="w-4 h-4 bg-red-500 rounded-full hover:scale-110 transition-transform"
        />
      </div>
    </div>

    {/* Content */}
    {!isMinimized && (
      <div className="p-4">
        <p>This is the {id} box. Drag, maximize, minimize, or close me!</p>
      </div>
    )}
  </div>
</Draggable>

  );
};

export default FloatingBox;
