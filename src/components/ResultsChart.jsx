import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

const ResultsChart = ({ score, level }) => {
  const getIcon = () => {
    if (score >= 70) return <CheckCircle className="h-16 w-16 text-green-500" />;
    if (score >= 40) return <AlertTriangle className="h-16 w-16 text-orange-500" />;
    return <XCircle className="h-16 w-16 text-red-500" />;
  };

  const getColor = () => {
    if (score >= 70) return 'text-green-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getStrokeColor = () => {
    if (score >= 70) return '#10b981';
    if (score >= 40) return '#f97316';
    return '#ef4444';
  };

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64">
        <svg className="transform -rotate-90 w-64 h-64">
          <circle
            cx="128"
            cy="128"
            r="90"
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="128"
            cy="128"
            r="90"
            stroke={getStrokeColor()}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {getIcon()}
          <span className={`text-4xl font-bold mt-2 ${getColor()}`}>{score}%</span>
        </div>
      </div>
      
      <h2 className={`text-2xl font-bold mt-6 ${getColor()}`}>
        {level.label}
      </h2>
      
      <p className="text-gray-600 text-center mt-3 max-w-md">
        {level.description}
      </p>
    </div>
  );
};

export default ResultsChart;