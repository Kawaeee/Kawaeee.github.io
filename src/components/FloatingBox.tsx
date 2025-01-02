"use client";

import React, { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";

const FloatingBox = ({
  id,
  onClose,
  onFocus,
  zIndex,
  position,
}: {
  id: string;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  zIndex: number;
  position: { x: number; y: number };
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [prevPosition, setPrevPosition] = useState<{ x: number; y: number } | null>(null);

  // Handle Minimize
  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
    setIsMaximized(false); // Exit maximize state if minimized
  };

  // Handle Maximize
  const toggleMaximize = () => {
    if (!isMaximized && nodeRef.current) {
      // Save the current transform position before maximizing
      const match = nodeRef.current.style.transform.match(/translate\((.+?)px, (.+?)px\)/);
      if (match) {
        setPrevPosition({ x: parseFloat(match[1]), y: parseFloat(match[2]) });
      }
    }
    setIsMaximized((prev) => !prev);
    setIsMinimized(false); // Exit minimize state if maximized
  };

  // Handle Transform and Restore Position
  useEffect(() => {
    if (nodeRef.current) {
      if (isMaximized) {
        nodeRef.current.style.transform = "none"; // Reset transform when maximized
      } else if (prevPosition) {
        // Restore previous position when exiting maximize
        const { x, y } = prevPosition;
        nodeRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    }
  }, [isMaximized, prevPosition]);

  // Box styles
  const boxStyles = {
    position: isMaximized ? "fixed" : "absolute",
    top: isMaximized ? 0 : undefined,
    left: isMaximized ? 0 : undefined,
    width: isMaximized ? "100vw" : "16rem", // Full width when maximized, default otherwise
    height: isMaximized ? "100vh" : "10rem", // Full height when maximized, default otherwise
    zIndex,
    margin: 0,
    padding: 0,
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds={!isMaximized ? "parent" : undefined} // Disable bounds when maximized
      disabled={isMaximized} // Disable dragging when maximized
      handle=".handle"
      defaultPosition={position}
      onStart={() => onFocus(id)}
    >
      <div
        ref={nodeRef}
        style={boxStyles}
        className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-2xl rounded-lg"
      >
        {/* Title Bar */}
        <div className="handle bg-gray-700 flex justify-between items-center p-2 cursor-move rounded-t-lg">
          <span className="font-semibold">{id.toUpperCase()}</span>
          <div className="flex space-x-2">
            <button
              onClick={toggleMinimize}
              className="w-4 h-4 bg-yellow-400 rounded-full hover:scale-110 transition-transform"
            />
            <button
              onClick={toggleMaximize}
              className="w-4 h-4 bg-green-400 rounded-full hover:scale-110 transition-transform"
            />
            <button
              onClick={() => onClose(id)}
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
