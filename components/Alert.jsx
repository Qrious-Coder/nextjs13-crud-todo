'use client'
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaTimes, FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const Alert = ({ children }) => {
  const [ isShow, setIsShow ] = useState(true);
  const { alertText, alertType, showAlert } = useSelector((state) => state.common);

  const handleClose = () => {
    setIsShow((prevState) => !prevState);
  };

  const getIcon = () => {
    switch (alertType) {
      case 'error':
        return <FaExclamationTriangle className="text-red-800 mr-2 text-3xl"/>;
      case 'success':
        return <FaCheckCircle className="text-green-800 mr-2 text-3xl"/>;
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-800 mr-2 text-3xl"/>;
      case 'info':
        return <FaInfoCircle className="text-blue-800 mr-2 text-3xl"/>;
      default:
        return null;
    }
  };

  const getColor = () => {
    switch (alertType) {
      case 'error':
        return "red";
      case 'success':
        return "green";
      case 'warning':
        return "yellow";
      case 'info':
        return "blue";
      default:
        return "gray";
    }
  };

  return (
    <>
      {showAlert && isShow && (
        <div className={`fixed top-0 left-1/2 transform -translate-x-1/2 bg-${getColor(alertType)}-700 text-center border border-${getColor(alertType)}-800 text-${getColor(alertType)}-800 mt-4 mb-4 px-5 py-2 relative flex items-center justify-center`}
             style={{ opacity: 0.75, zIndex: 10, maxWidth: '90vw' }}
        >
          {getIcon()}
          <span className={'pt-3'}>
            {children ? children : alertText}
          </span>
          <FaTimes className="absolute right-2 top-2 cursor-pointer text-2xl" onClick={handleClose} />
        </div>
      )}
      <style jsx>{`
        .red { background-color: #f56565; border-color: #c53030; color: #c53030; }
        .green { background-color: #48bb78; border-color: #2f855a; color: #2f855a; }
        .yellow { background-color: #ed8936; border-color: #c05621; color: #c05621; }
        .blue { background-color: #4299e1; border-color: #2b6cb0; color: #2b6cb0; }
        .gray { background-color: #a0aec0; border-color: #718096; color: #718096; }
      `}</style>
    </>
  );
};

export default Alert;
