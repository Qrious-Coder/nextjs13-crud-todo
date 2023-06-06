import { useEffect, useState } from 'react';

function ProgressBar({ progress }) {
  const [labelPosition, setLabelPosition] = useState(0);

  // Update label position based on progress
  useEffect(() => {
    setLabelPosition(progress);
  }, [progress]);

  return (
    <div className="relative mt-28 mb-10">
      <div className="progress-bar">
        <div className="progress" style={{width: `${progress}%`}}></div>
        <div className="markers">
          {[0, 25, 50, 75, 100].map((item, index) => (
            <div key={index} className="marker"></div>
          ))}
        </div>
      </div>
      <div className="label" style={{left: `${progress}%`}}>
        <div className="label-content">
          <span>{progress}%</span>
        </div>
        <div className="label-tip"></div>
      </div>

      <style jsx>{`
        .progress-bar {
          width: 100%;
          height: 6px;
          outline: 1px solid #a78bfa;
          box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(5px);
          border-radius: 12px;
          padding: 0.5px;
          //margin: 25px 0 3px 0;
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
          box-shadow: 0px 5px 15px -5px rgba(0, 0, 0, 0.3);
        }
        .label-content {
          width: 47px;
          height: 47px;
          border-radius: 50%;
          background-image: radial-gradient(circle at 50% 120.71%, #fe91ff 0, #ab74ff 25%, #5353f2 50%, #0032b0 75%, #001876 100%);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .label-content span {
          font-size: 1rem;
          color: #fe91ff;
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
