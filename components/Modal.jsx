import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-dark flex">
      <span className="relative p-6 bg-white w-full max-w-sm m-auto flex-col flex">
        <span className="absolute top-0 right-0 p-4">
          <button onClick={onClose} className="focus:outline-none">
            X
          </button>
        </span>
        {children}
      </span>
    </div>
  );
};

export default Modal
