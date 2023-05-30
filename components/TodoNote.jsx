import React, { useState, useEffect, useCallback } from 'react';
import { RiSaveLine, RiSaveFill, RiCloseLine, RiCloseFill } from 'react-icons/ri';

const TodoNote = ({ isOpen, onSave, onClose, children }) => {
  const [isSaveHovered, setIsSaveHovered] = useState(false);
  const [isExitHovered, setIsExitHovered] = useState(false);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      onSave();
    }
  }, [onSave]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
    };
  }, [handleKeyDown]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex justify-center items-center" onClick={onClose}>
      <div
        className="relative p-6 bg-yellow-100 w-64 h-64 m-auto flex flex-col text-violet-700 shadow-2xl"
        style={{ fontFamily: "'Indie Flower', cursive" }}
        onClick={(e) => e.stopPropagation()}>
        <span className="absolute top-0 right-0 p-4">
          <button
            onMouseEnter={() => setIsSaveHovered(true)}
            onMouseLeave={() => setIsSaveHovered(false)}
            onClick={onSave}
            className="focus:outline-none text-purple-700 text-3xl">
            {isSaveHovered ? <RiSaveFill /> : <RiSaveLine />}
          </button>
          <button
            onMouseEnter={() => setIsExitHovered(true)}
            onMouseLeave={() => setIsExitHovered(false)}
            onClick={onClose}
            className="focus:outline-none text-red-500 text-3xl mr-4">
            {isExitHovered ? <RiCloseFill /> : <RiCloseLine />}
          </button>
        </span>
        {children}
      </div>
    </div>
  );
};

export default TodoNote;
