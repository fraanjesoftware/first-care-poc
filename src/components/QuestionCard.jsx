import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const QuestionCard = ({ question, answer, onAnswer, onNext, onPrevious, isFirst, isLast }) => {
  const handleOptionClick = (value) => {
    onAnswer(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8 animate-fade-in">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
        {question.question}
      </h2>
      
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
              answer === option.value
                ? 'border-[#0066CC] bg-blue-50 shadow-sm'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                answer === option.value
                  ? 'border-[#0066CC] bg-[#0066CC]'
                  : 'border-gray-400'
              }`}>
                {answer === option.value && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className={`text-base ${
                answer === option.value ? 'text-gray-900 font-medium' : 'text-gray-700'
              }`}>
                {option.label}
              </span>
            </div>
          </button>
        ))}
      </div>
      
      <div className="flex justify-between mt-8">
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className={`flex items-center px-4 py-2 rounded-lg transition-all ${
            isFirst
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Vorige
        </button>
        
        <button
          onClick={onNext}
          disabled={!answer}
          className={`flex items-center px-6 py-2 rounded-lg font-medium transition-all ${
            answer
              ? 'bg-[#0066CC] text-white hover:bg-[#0052A3]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isLast ? 'Voltooien' : 'Volgende'}
          {!isLast && <ChevronRight className="h-5 w-5 ml-1" />}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;