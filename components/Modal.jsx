import React from 'react';
import { BiErrorAlt } from 'react-icons/bi';

const Modal = ({ show, onClose, onOK }) => {
  return (
    <>
      <div className={show ? "modal display-block" : "modal display-none"}>
        <section className="modal-main">
          <div className="flex">
            <span className="mr-2"><BiErrorAlt size="2em" color="#8b5cf6" /></span>
            <span className="mt-1">Please login or register to use this feature.</span>
          </div>
          <div className="flex justify-end">
            <button className="ok-button" onClick={ onOK }>OK</button>
            <button className="cancel-button" onClick={ onClose }>Cancel</button>
          </div>
        </section>
      </div>
      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-main {
          display: flex;
          flex-direction: column;
          position: absolute;
          width: 450px;
          height: 15vh;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #111827;
          margin: 0 auto;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 5px 16px 0 #2563eb;
          border: 1px solid #10b981;
        }
        .modal-main:hover {
          box-shadow: 0 5px 16px 0 #3b82f6;
          background: #020617;
        }
        .display-block {
          display: block;
          z-index: 100;
        }

        .display-none {
          display: none;
        }

        .ok-button {
          background: linear-gradient(90deg, #14b8a6, #3b82f6, #a855f7);
          border: none;
          border-radius: 8px;
          padding: 2px 20px;
          margin: 15px 10px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .ok-button:hover {
          background: linear-gradient(180deg, #16c7b9, #3b82f6, #a855f7);
        }

        .cancel-button {
          background: #0f172a;
          border: 2px solid #8b5cf6;
          border-radius: 8px;
          color: #8b5cf6;
          padding: 5px 20px ;
          margin: 15px 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cancel-button:hover {
          background: #1a2138;
          border-color: #a78bfa;
          color: #a78bfa;
        }
      `}</style>
    </>
  );
};

export default Modal;
