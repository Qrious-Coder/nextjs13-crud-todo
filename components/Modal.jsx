import React from 'react';

const Modal = ({ show, onClose, onOK }) => {
  return (
    <>
      <div className={show ? "modal display-block" : "modal display-none"}>
        <section className="modal-main">
          Please login or register to use this feature.
          <button onClick={ onOK }>OK</button>
          <button onClick={ onClose }>Cancel</button>
        </section>
      </div>
      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-main {
          position: absolute; // changed from absolute to relative
          width: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%); // added this line
          background: #111827;
          margin: 0 auto;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0px 5px 16px 0px #0b325e;
          border: 1px dotted #4ade80;
        }

        .display-block {
          display: block;
          z-index: 100;
        }

        .display-none {
          display: none;
        }
      `}</style>
    </>
  );
};

export default Modal;
