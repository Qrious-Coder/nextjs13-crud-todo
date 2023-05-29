import React, { useState } from 'react';
import { RiSaveLine, RiSaveFill } from 'react-icons/ri';

const Modal = ({ isOpen, onSave , children }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex justify-center items-center" onClick={onSave}>
      <div
        className="relative p-6 bg-yellow-100 w-64 h-64 m-auto flex flex-col text-violet-700 shadow-2xl"
        style={{ fontFamily: "'Indie Flower', cursive" }}
        onClick={(e) => e.stopPropagation()}>
        <span className="absolute top-0 right-0 p-4">
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onSave}
            className="focus:outline-none text-purple-700 text-3xl">
            {isHovered ? <RiSaveFill /> : <RiSaveLine />}
          </button>
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
