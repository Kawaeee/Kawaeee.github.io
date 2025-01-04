"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Draggable from "react-draggable";

type FloatingBoxProps = {
  id: string;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  zIndex: number;
  position: { x: number; y: number };
  content: React.ReactNode;
};

const FloatingBox: React.FC<FloatingBoxProps> = ({
  id,
  onClose,
  onFocus,
  zIndex,
  position: initialPosition,
  content,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(initialPosition);
  const [previousPosition, setPreviousPosition] = useState<{ x: number; y: number } | null>(null);
  const [isVisible, setIsVisible] = useState(false); // Initially invisible for open animation
  const [isDragging, setIsDragging] = useState(false); // New state for drag handling

  // Trigger open animation on mount
  useEffect(() => {
    console.log(`FloatingBox ${id} updated zIndex: ${zIndex}`);
    setTimeout(() => setIsVisible(true), 0); // Ensure animation runs after the initial render
  }, [zIndex]);

  const toggleMinimize = useCallback(() => {
    if (!isDragging) {
      if (isMaximized) {
        if (previousPosition) setCurrentPosition(previousPosition);
        setIsMinimized(true);
        setIsMaximized(false);
      } else if (!isMinimized) {
        setPreviousPosition(currentPosition);
        setIsMinimized(true);
      } else {
        setIsMinimized(false);
        if (previousPosition) setCurrentPosition(previousPosition);
      }
    }
  }, [isDragging, isMinimized, isMaximized, currentPosition, previousPosition]);

  const toggleMaximize = useCallback(() => {
    if (!isDragging) {
      if (!isMaximized) {
        setPreviousPosition(currentPosition);
        setCurrentPosition({ x: 0, y: 0 });
        setIsMaximized(true);
        setIsMinimized(false);
      } else {
        setIsMaximized(false);
        if (previousPosition) setCurrentPosition(previousPosition);
      }
    }
  }, [isDragging, isMaximized, currentPosition, previousPosition]);

  const handleClose = useCallback(() => {
    if (!isDragging) {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300); // Delay to allow close animation to complete
    }
  }, [isDragging, id, onClose]);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    handleFocus();
  }, []);

  const handleDragStop = useCallback((_, data) => {
    setIsDragging(false);
    setCurrentPosition({ x: data.x, y: data.y });
  }, []);

  const handleFocus = useCallback(() => {
    console.log(`Focusing box: ${id}`);
    onFocus(id); // Call the parent's callback to update the z-index
  }, [id, onFocus]);
  
  const boxStyles: React.CSSProperties = {
    position: "fixed",
    zIndex,
    top: isMaximized ? "20px" : undefined,
    left: isMaximized ? "20px" : undefined,
    width: isMaximized ? "calc(100vw - 40px)" 
    : isMinimized
    ? "15rem"
    : "auto",
    height: isMaximized
    ? "calc(100vh - 40px)"
    : isMinimized
    ? "2.5rem"
    : "auto",
    maxWidth: isMaximized ? "none" : "75vw", // Prevent the box from being too wide
    maxHeight: isMaximized ? "none" : "75vh", // Prevent the box from being too tall
    borderRadius: isMaximized ? "0" : "15px",
    boxShadow: isMaximized ? "none" : "0 4px 15px rgba(0, 0, 0, 0.3)",
    overflow: isMinimized ? "hidden" : "auto",
    transform: isVisible ? "scale(1)" : "scale(0.8)",
    opacity: isVisible ? 1 : 0,
    transition: isDragging ? "none" : "all 0.3s ease-in-out", // Disable transition during dragging
  };

  const contentStyles: React.CSSProperties = {
    flex: 1,
    overflow: "auto",
    padding: "1rem",
    display: isMinimized ? "none" : "block",
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      disabled={isMaximized}
      handle=".handle"
      bounds={!isMaximized ? "parent" : undefined}
      position={currentPosition}
      onStart={handleDragStart}
      onStop={handleDragStop}
    >
      <div
        ref={nodeRef}
        style={boxStyles}
        onMouseDown={handleFocus}
        className="bg-gradient-to-br from-gray-800 to-gray-900 text-white"
      >
        <div className="handle bg-gray-700 flex justify-between items-center p-2 cursor-move rounded-t-lg">
          <span className="font-nanoline-solid">{id.toUpperCase()}</span>
          <div className="flex space-x-2">
            <button
              onClick={toggleMinimize}
              className="w-4 h-4 rounded-full transition-transform bg-yellow-400 hover:scale-110"
            />
            <button
              onClick={toggleMaximize}
              className="w-4 h-4 rounded-full transition-transform bg-green-400 hover:scale-110"
            />
            <button
              onClick={handleClose}
              className="w-4 h-4 bg-red-500 rounded-full hover:scale-110 transition-transform"
            />
          </div>
        </div>

        {!isMinimized && (<div style={contentStyles}>{content}</div>)}
      </div>
    </Draggable>
  );
};

export default FloatingBox;
