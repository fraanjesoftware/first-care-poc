import React from 'react';

const ProgressBar = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Vraag {current} van {total}</span>
        <span>{percentage}% voltooid</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          className="h-full bg-[#0066CC] transition-all duration-300 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;