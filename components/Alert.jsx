'use client'
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaTimes, FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import { CgCloseR } from 'react-icons/cg'

const Alert = ({ children }) => {
  const [ isShow, setIsShow ] = useState(true);
  const { alertText, alertType, showAlert } = useSelector((state) => state.common);

  const handleClose = () => {
    setIsShow((prevState) => !prevState);
  };

  const getIcon = () => {
    switch (alertType) {
      case 'error':
        return <FaExclamationTriangle className="text-red-800 text-2xl"/>;
      case 'success':
        return <FaCheckCircle className="text-green-800 text-2xl"/>;
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-800 text-2xl"/>;
      case 'info':
        return <FaInfoCircle className="text-blue-800 text-2xl"/>;
      default:
        return null;
    }
  };

  const getColor = () => {
    switch (alertType) {
      case 'error':
        return "bg-red-950/50 border-red-800 text-red-200";
      case 'success':
        return "bg-green-950/50 border-green-800 text-green-200";
      case 'warning':
        return "bg-yellow-950/50 border-yellow-800 text-yellow-200";
      case 'info':
        return "bg-blue-950/50 border-blue-800 text-blue-200";
      default:
        return "bg-gray-950/50 border-gray-800 text-gray-200";
    }
  };

  return (
    <>
      {showAlert && isShow && (
        <div className={`fixed top-0 left-1/2 transform -translate-x-1/2 text-center border border-dashed 
        rounded-lg ${getColor()} mt-4 mb-4 px-5 py-2 relative flex items-center justify-center`}
             style={{ zIndex: 10, maxWidth: '90vw' }}
        >
          {getIcon()}
          <span className={'p-3'}>
            {children ? children : alertText}
          </span>
          <CgCloseR className={`absolute right-2 top-2 cursor-pointer text-lg ${getColor()}`} onClick={handleClose} />
        </div>
      )}
    </>
  );
};

export default Alert;
