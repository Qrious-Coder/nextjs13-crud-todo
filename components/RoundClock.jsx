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
  const percent = ((24 - time.hours) / 24) * 100;

  return (
    <div className="flex flex-col items-center relative">
      <h2 className="text-2xl mb-4 font-bold text-blue-500">The remaining time of today is...</h2>
      <svg className="progress-ring" width="280" height="280">
        <circle className="progress-ring__circle-bg" stroke="#ddd" strokeWidth="20" fill="transparent" r="110" cx="140" cy="140" strokeDasharray="8 2"/>
        <circle className="progress-ring__circle" stroke={isHourLeft ? "#ff0000" : "#00ff00"} strokeWidth="20" fill="transparent" r="110" cx="140" cy="140" strokeDasharray="8 2"/>
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-4xl font-bold">{`${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`}</h1>
      </div>
      <h2 className="text-2xl mt-4 font-bold text-blue-500">Write a todo list to optimize your {time.hours} {time.hours > 1 ? 'hours' : 'hour'} left.</h2>
      <style jsx>{`
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
