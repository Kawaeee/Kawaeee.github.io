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
    setTimeout(() => setIsVisible(true), 0); // Ensure animation runs after the initial render
  }, []);

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
    onFocus(id);
  }, [id, onFocus]);

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
        className={`fixed bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-lg shadow-lg overflow-hidden ${
          isMaximized
            ? "top-5 left-5 w-[calc(100vw-40px)] h-[calc(100vh-40px)] rounded-none shadow-none"
            : isMinimized
            ? "w-60 h-10"
            : "max-w-[75vw] max-h-[75vh]"
        } ${isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"} ${
          isDragging ? "" : "transition-all duration-300 ease-in-out"
        }`}
        style={{ zIndex }}
        onMouseDown={handleFocus}
      >
        <div className="handle bg-gray-700 flex justify-between items-center p-2 cursor-move">
          <span className="font-nanoline-solid">{id.toUpperCase()}</span>
          <div className="flex space-x-2">
          <button
            onClick={toggleMinimize}
            className="w-4 h-4 rounded-full bg-yellow-400 hover:scale-125 transition-transform duration-300 ease-in-out"
            title="Minimize"
          />
          <button
            onClick={toggleMaximize}
            className="w-4 h-4 rounded-full bg-green-400 hover:scale-125 transition-transform duration-300 ease-in-out"
            title="Maximize"
          />
          <button
            onClick={handleClose}
            className="w-4 h-4 rounded-full bg-red-500 hover:scale-125 transition-transform duration-300 ease-in-out"
            title="Close"
          />
          </div>
        </div>
        {!isMinimized && <div className="flex-1 overflow-auto p-4">{content}</div>}
      </div>
    </Draggable>
  );
};

export default FloatingBox;
