'use client'
import { useEffect, useState } from 'react';

function ProgressBar({ progress }) {
  const [labelPosition, setLabelPosition] = useState(0);
  useEffect(() => {
    setLabelPosition(progress);
  }, [progress]);

  if (isNaN(progress)) return null;

  return (<div className="relative mt-28 mb-10">
      <div className="progress-bar">
        <div className="progress" style={{width: `${ labelPosition }%`}}></div>
        <div className="markers">
          {[0, 25, 50, 75, 100].map((item, index) => (
            <div key={index} className="marker"></div>
          ))}
        </div>
      </div>
      <div className="label" style={{left: `${ labelPosition }%`}}>
        <div className="label-content">
          <span>{labelPosition}%</span>
        </div>
        <div className="label-tip"></div>
      </div>

      <style jsx>{`
        .progress-bar {
          width: 100%;
          height: 6px;
          outline: 1px solid #2dd4bf;
          box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(5px);
          border-radius: 12px;
          padding: 0.5px;
          position: relative;
        }
        .progress {
          height: 100%;
          background-image: linear-gradient(-45deg, #22c55e 15%, #818cf8 25%, #2563eb 35%);
          background-size: 200% 100%;
          animation: progress-bar-stripes 1s linear infinite;
          border-radius: 12px;
        }
        @keyframes progress-bar-stripes {
          from  { background-position: 200% 0; }
          to    { background-position: -200% 0; }
        }
        .markers {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
        .marker {
          height: 2px;
          width: 2px;
          background-color: #8b5cf6;
          border-radius: 50%;
          padding: 3.2px;
          margin: -0.5px;
        }
        .label {
          position: absolute;
          top: -18px;
          transform: translate(-50%, calc(-100% + 3px));
          box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.3);
        }
        .label-content {
          width: 47px;
          height: 47px;
          border-radius: 50%;
          background-image: radial-gradient(circle at 50% 120.71%, #0ea5e9 0, #ab74ff 25%, #5353f2 50%, #10b981 75%, #4c1d95 100%);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .label-content span {
          font-size: 1rem;
          color: #fef08a;
        }
        .label-tip {
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 12px solid #ab74ff;
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
        }
      `}</style>
    </div>
  );
}

export default ProgressBar;
