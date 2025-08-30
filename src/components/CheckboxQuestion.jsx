import React from 'react';
import { Check } from 'lucide-react';

const CheckboxQuestion = ({ question, answer = [], onAnswer }) => {
  const handleToggle = (value) => {
    const currentAnswers = Array.isArray(answer) ? answer : [];
    const newAnswers = currentAnswers.includes(value)
      ? currentAnswers.filter(v => v !== value)
      : [...currentAnswers, value];
    
    onAnswer(newAnswers);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{question.question}</h3>
      {question.hint && (
        <p className="text-sm text-gray-600 mb-4">{question.hint}</p>
      )}
      
      <div className="space-y-2">
        {question.options.map((option) => {
          const isChecked = Array.isArray(answer) && answer.includes(option.value);
          
          return (
            <label
              key={option.value}
              className={`
                flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all
                ${isChecked 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300 bg-white'
                }
              `}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isChecked}
                  onChange={() => handleToggle(option.value)}
                />
                <div className={`
                  w-5 h-5 rounded border-2 flex items-center justify-center mr-3 transition-all
                  ${isChecked 
                    ? 'border-blue-500 bg-blue-500' 
                    : 'border-gray-300 bg-white'
                  }
                `}>
                  {isChecked && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
              <div className="flex-1">
                <span className="text-gray-800 font-medium">{option.label}</span>
                {option.description && (
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                )}
              </div>
            </label>
          );
        })}
      </div>
      
      {question.minRequired && (
        <p className="text-sm text-gray-500 mt-3">
          Selecteer minimaal {question.minRequired} opties
        </p>
      )}
    </div>
  );
};

export default CheckboxQuestion;