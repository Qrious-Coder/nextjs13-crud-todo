'use client'
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import cs from 'classnames';

const Alert = ({ children }) => {
  const [isShow, setIsShow] = useState(true);
  const { alertText, alertType, showAlert } = useSelector((state) => state.common);

  const handleClose = () => {
    setIsShow((prevState) => !prevState);
  };


  const renderChildEl = () => {
    return React.cloneElement(children);
  };

  return (
    <>
      {showAlert && (
        <div
          className={cs(
            'alert',
            'border-yellow-800',
            ${alertType},
            !isShow && 'isHide'
          )}
        >
          {children ? renderChildEl() : alertText}
         <span className='closeBtn' onClick={handleClose}>
            &times;
          </span>
        </div>
      )}
    </>
  );
};

export default Alert;
