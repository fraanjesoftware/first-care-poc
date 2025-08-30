import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CheckboxQuestion from './CheckboxQuestion';
import MatrixQuestion from './MatrixQuestion';
import RankingQuestion from './RankingQuestion';

const EnhancedQuestionCard = ({ question, answer, onAnswer, onNext, onPrevious, isFirst, isLast }) => {
  // Validation function to check if answer is complete
  const isAnswerValid = () => {
    if (!answer) return false;
    
    switch (question.type) {
      case 'radio':
        return !!answer;
      
      case 'checkbox':
        return Array.isArray(answer) && answer.length > 0 && 
               (!question.minRequired || answer.length >= question.minRequired);
      
      case 'matrix':
        // Check if all rows have been answered
        return question.rows.every(row => answer[row.value]);
      
      case 'ranking':
        // Check if items have been arranged (answer should be an array)
        return Array.isArray(answer) && answer.length === question.options.length;
      
      default:
        return !!answer;
    }
  };

  const renderQuestion = () => {
    switch (question.type) {
      case 'radio':
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{question.question}</h3>
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => onAnswer(option.value)}
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
                  <div className="flex-1">
                    <span className={`text-base ${
                      answer === option.value ? 'text-gray-900 font-medium' : 'text-gray-700'
                    }`}>
                      {option.label}
                    </span>
                    {option.description && (
                      <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        );
      
      case 'checkbox':
        return <CheckboxQuestion question={question} answer={answer} onAnswer={onAnswer} />;
      
      case 'matrix':
        return <MatrixQuestion question={question} answer={answer} onAnswer={onAnswer} />;
      
      case 'ranking':
        return <RankingQuestion question={question} answer={answer} onAnswer={onAnswer} />;
      
      default:
        return <div>Onbekend vraagtype: {question.type}</div>;
    }
  };

  const getValidationMessage = () => {
    if (question.type === 'checkbox' && question.minRequired) {
      const selected = Array.isArray(answer) ? answer.length : 0;
      if (selected < question.minRequired) {
        return `Selecteer minimaal ${question.minRequired} opties (${selected} geselecteerd)`;
      }
    }
    
    if (question.type === 'matrix') {
      const answered = answer ? Object.keys(answer).length : 0;
      const total = question.rows.length;
      if (answered < total) {
        return `Beoordeel alle items (${answered}/${total} voltooid)`;
      }
    }
    
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8 animate-fade-in">
      <div className="mb-6">
        {renderQuestion()}
      </div>
      
      {getValidationMessage() && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          {getValidationMessage()}
        </div>
      )}
      
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
          disabled={!isAnswerValid()}
          className={`flex items-center px-6 py-2 rounded-lg font-medium transition-all ${
            isAnswerValid()
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

export default EnhancedQuestionCard;