import React from 'react';

const Loading = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="loader ease-linear rounded-full h-24 w-24"></div>
    <style jsx>{`
      .loader {
        border-width: 8px;
        border-top-color: #6B7280;
        border-right-color: #A78BFA;
        border-bottom-color: #10B981;
        border-left-color: #60A5FA;
        animation: spin 1s linear infinite, colors 3s ease-in-out infinite;
        box-shadow: 0 0 10px 0px #9CA3AF;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes colors {
        0% {border-color: #A78BFA #10B981 #60A5FA #6B7280;}
        33% {border-color: #10B981 #60A5FA #6B7280 #A78BFA;}
        67% {border-color: #60A5FA #6B7280 #A78BFA #10B981;}
        100% {border-color: #A78BFA #10B981 #60A5FA #6B7280;}
      }
    `}</style>
  </div>
);

export default Loading;
