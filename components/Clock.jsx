'use client'
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import 'tailwindcss/tailwind.css';

dayjs.extend(duration);

const Clock = () => {
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(getTimeRemaining());
    const timer = setInterval(() => {
      setTime(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isHourLeft = time?.hours <= 1;

  return (
    <div className="flex flex-col space-y-8">
      <h1 className="text-5xl font-bold text_gradient">
        Hello, today you have
      </h1>
      <div className="flex space-x-4">
        {['hours', 'minutes', 'seconds'].map((unit, i) => (
          <span className="flex" key={i} >
            <span className="flex items-center justify-center relative bg-gray-700 shadow-lg rounded-lg h-24 w-16 p-2">
              <span className={`text-3xl font-bold ${isHourLeft 
                ? 'text-yellow-500' 
                : 'text-green-300'}`}>{time ? pad(time[unit.toLowerCase()]) : '00'}</span>
            </span>
            <span className="ml-2 mt-8 text-lg">{unit}</span>
          </span>
        ))}
        <span className="mt-4 text-5xl font-bold text_gradient">
          left...
        </span>
      </div>
      <div className="mt-4 text-lg">
        Make a
        <span className="font-bold ml-1 text-blue-500 mr-1">todolist</span>
        to maximize your remaining
        <span className="font-bold ml-1 text_gradient">
          {time?.hours} {time?.hours > 1 ? 'hours' : 'hour'}
        </span>.
      </div>
      <style jsx>{`
       .text_gradient {
        background: linear-gradient(120deg, #2563eb, #34d399, #818cf8);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
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

export default Clock;
