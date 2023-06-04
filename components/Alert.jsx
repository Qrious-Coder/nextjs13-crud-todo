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
      case 'danger':
        return <FaExclamationTriangle className="text-red-800 mr-2"/>;
      case 'success':
        return <FaCheckCircle className="text-green-800 mr-2"/>;
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-800 mr-2"/>;
      case 'info':
        return <FaInfoCircle className="text-blue-800 mr-2"/>;
      default:
        return null;
    }
  };

  const getAlertBgColor = () => {
    switch (alertType) {
      case 'danger':
        return "bg-red-300";
      case 'success':
        return "bg-green-300";
      case 'warning':
        return "bg-yellow-300";
      case 'info':
        return "bg-blue-300";
      default:
        return "bg-gray-300";
    }
  };

  const getAlertBorderColor = () => {
    switch (alertType) {
      case 'danger':
        return "border-red-800";
      case 'success':
        return "border-green-800";
      case 'warning':
        return "border-yellow-800";
      case 'info':
        return "border-blue-800";
      default:
        return "border-gray-800";
    }
  };

  return (
    <>
      {showAlert && isShow && (
        <div className={`alert ${getAlertBgColor()} ${getAlertBorderColor()} 
        border text-${alertType}-800 mt-4 mb-4 px-3 py-2 relative flex items-center`}
             style={{ opacity: 0.75 }}>
          {getIcon()}
          <span>
            {children ? children : alertText}
          </span>
          <FaTimes className="absolute right-2 top-2 cursor-pointer" onClick={handleClose} />
        </div>
      )}
    </>
  );
};

export default Alert;
