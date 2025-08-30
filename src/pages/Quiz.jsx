import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import EnhancedQuestionCard from '../components/EnhancedQuestionCard';
import { comprehensiveQuestions, getTotalComprehensiveQuestions } from '../utils/comprehensiveQuestions';

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const totalQuestions = getTotalComprehensiveQuestions();

  // Load saved progress from session storage
  useEffect(() => {
    const savedAnswers = sessionStorage.getItem('bhv_quiz_answers');
    const savedQuestion = sessionStorage.getItem('bhv_quiz_current');
    
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
    if (savedQuestion) {
      setCurrentQuestion(parseInt(savedQuestion));
    }
  }, []);

  // Save progress to session storage
  useEffect(() => {
    sessionStorage.setItem('bhv_quiz_answers', JSON.stringify(answers));
    sessionStorage.setItem('bhv_quiz_current', currentQuestion.toString());
  }, [answers, currentQuestion]);

  const handleAnswer = (value) => {
    setAnswers(prev => ({
      ...prev,
      [comprehensiveQuestions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Quiz completed, go to contact form
      navigate('/contact');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const question = comprehensiveQuestions[currentQuestion];
  const currentAnswer = answers[question.id];

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8">
          <ProgressBar current={currentQuestion + 1} total={totalQuestions} />
        </div>
        
        <EnhancedQuestionCard
          question={question}
          answer={currentAnswer}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirst={currentQuestion === 0}
          isLast={currentQuestion === totalQuestions - 1}
        />
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Uw antwoorden worden automatisch opgeslagen
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;