import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const RoundClock = () => {
  const [time, setTime] = useState(getTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isHourLeft = time.hours <= 1;
  const isMinuteLeft = time.minutes <= 1;
  const percent = ((24 - time.hours) / 24) * 100;

  return (
    <div className="flex flex-col items-center mt-5 relative">
      <h2 className="text-3xl font-bold text_gradient">You have...</h2>
      <div className="relative w-64 h-64 my-8 rounded-full bg-indigo-950 overflow-hidden flame-shadow">
        <svg className="progress-ring absolute top-0 left-0 w-full h-full" viewBox="0 0 280 280">
          <circle className="progress-ring__circle-bg" stroke="#0ea5e9" strokeWidth="15" fill="transparent"
                  r="110" cx="140" cy="140" strokeDasharray="8 2"/>
          <circle className="progress-ring__circle" stroke="#7dd3fc"
                  strokeWidth="15" fill="transparent" r="110" cx="140" cy="140" strokeDasharray="8 2"/>
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-4xl font-digital text-indigo-500">
            <span className="text-cyan-400">{`${pad(time.hours)}`}</span>
            {`:${pad(time.minutes)}:${pad(time.seconds)}`}</h1>
        </div>
      </div>
      <h2 className="text-3xl font-bold text_gradient" >...left today.</h2>
      <p className="font-bold text-blue-500 mt-5 mb-8 " >
        Write a todo list to optimize
        <span className="font-bold ml-1 text_gradient text-lg">
            the remaining {isHourLeft ? `${time.minutes} minutes` : isMinuteLeft ? `${time.seconds} seconds` : `${time.hours} hours`}
          </span>
      </p>
      <style jsx>{`
        @font-face {
          font-family: 'Digital';
          src: url('path_to_your_font_file') format('woff2');
        }
        .text_gradient {
          background: linear-gradient(to right, #4ade80, #22d3ee);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .flame-shadow {
          animation: flame 2s infinite;
        }
        @keyframes flame {
          0% {
            box-shadow: 0 0 10px 5px #14b8a6;
          }
          50% {
            box-shadow: 0 0 15px 10px #3b82f6;
          }
          100% {
            box-shadow: 0 0 10px 5px #38bdf8;
          }
        }
        .font-digital {
          font-family: 'Digital', sans-serif;
        }
        .progress-ring__circle {
          stroke-dasharray: 692;
          stroke-dashoffset: ${692 * ((100 - percent) / 100)};
          stroke-linecap: round;
          transition: stroke-dashoffset 0.35s;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
        }
        .progress-ring__circle-bg {
          stroke-dasharray: 692;
          stroke-dashoffset: 0;
        }
      `}</style>
    </div>
  );
};

function getTimeRemaining() {
  let now = dayjs();
  let midnight = dayjs().endOf('day');
  let diff = dayjs.duration(midnight.diff(now));

  return {
    hours: diff.hours(),
    minutes: diff.minutes(),
    seconds: diff.seconds(),
  };
}

function pad(number) {
  return number.toString().padStart(2, '0');
}

export default RoundClock;
