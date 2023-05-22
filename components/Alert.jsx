import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import cs from 'classnames';
import { FaTimes, FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const Alert = ({ children }) => {
  const [isShow, setIsShow] = useState(true);
  const { alertText, alertType, showAlert } = useSelector((state) => state.common);

  const handleClose = () => {
    setIsShow((prevState) => !prevState);
  };

  const renderChildEl = () => {
    return React.cloneElement(children);
  };

  const getIcon = () => {
    switch (alertType) {
      case 'danger':
        return <FaExclamationTriangle />;
      case 'success':
        return <FaCheckCircle />;
      case 'warning':
        return <FaExclamationTriangle />;
      case 'info':
        return <FaInfoCircle />;
      default:
        return null;
    }
  };

  return (
    <>
      {showAlert && (
        <div className={cs('alert', `border-${alertType}`, alertType, !isShow && 'isHide')}>
          {getIcon()}
          {children ? renderChildEl() : alertText}
          <span className="closeBtn" onClick={handleClose}>
            <FaTimes />
          </span>
        </div>
      )}
    </>
  );
};

export default Alert;
