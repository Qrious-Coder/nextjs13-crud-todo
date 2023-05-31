'use client'
import { useEffect, useState } from 'react';
import { FiMapPin } from 'react-icons/fi'; // import the location pin icon

function ProgressBar({ progress }) {
  const [color, setColor] = useState('from-gray-800 to-blue-800');
  const [labelColor, setLabelColor] = useState('text-purple-500');

  // Update color based on completion percentage
  useEffect(() => {
    if (progress >= 0 && progress < 25) {
      setColor('from-red-500 to-red-500');
      setLabelColor('text-red-500')
    } else if (progress >= 25 && progress < 50) {
      setColor('from-yellow-500 to-yellow-500');
      setLabelColor('text-yellow-500');
    } else if (progress >= 50 && progress < 75) {
      setColor('from-blue-500 to-blue-500');
      setLabelColor('text-blue-500');
    } else if (progress >= 75 && progress <= 100) {
      setColor('from-green-500 to-green-500');
      setLabelColor('text-green-500');
    }
  }, [progress]);

  return (
    <div className="relative mt-20">
      <div className="w-full h-6 bg-violet-500 rounded-lg p-0.5 mb-5">
        <div className={`h-full rounded-lg bg-gradient-to-r ${color}`} style={{width: `${progress}%`}}></div>
        <div className="absolute inset-0 flex justify-between w-full">
          {[0, 25, 50, 75, 100].map((item, index) => (
            <div key={index} className="h-2 w-2 bg-purple-500 rounded-full p-1.2 m-1.5"></div>
          ))}
        </div>
      </div>
      <div className="absolute top-0 transform -translate-y-3/4 flex justify-between w-full">
        <div className="rounded-full flex justify-center items-center relative mb-2" style={{width: '40px', height: '40px'}}>
          <FiMapPin className={`${labelColor} text-2xl `}/>
          <span className="text-purple-500 text-xl">{progress}%</span>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
