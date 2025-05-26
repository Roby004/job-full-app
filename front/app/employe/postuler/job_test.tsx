// QuestionnairePage.tsx
import React, { useState, useEffect } from 'react';
import { questions } from './questionnaire';
import { useNavigate } from 'react-router-dom';

const QuestionnairePage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
  const navigate = useNavigate();

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (val: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: val });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    console.log('User Answers:', answers);
    navigate('/merci'); // success page or summary
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Question {currentIndex + 1} / {questions.length}</h2>
        <div className="text-sm font-semibold text-red-600">
          ⏰ {minutes}:{seconds < 10 ? '0' : ''}{seconds}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow text-gray-800">
        <p className="text-md font-medium mb-4">{currentQuestion.question}</p>

        {currentQuestion.type === 'qcm' && currentQuestion.options?.map((opt) => (
          <label key={opt} className="block mb-2">
            <input
              type="radio"
              name={`question-${currentQuestion.id}`}
              className="mr-2"
              checked={answers[currentQuestion.id] === opt}
              onChange={() => handleAnswer(opt)}
            />
            {opt}
          </label>
        ))}

        {currentQuestion.type === 'truefalse' && (
          ['Vrai', 'Faux'].map((val) => (
            <label key={val} className="block mb-2">
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                className="mr-2"
                checked={answers[currentQuestion.id] === val}
                onChange={() => handleAnswer(val)}
              />
              {val}
            </label>
          ))
        )}

        {currentQuestion.type === 'long' && (
          <textarea
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            rows={5}
            className="w-full border px-3 py-2 rounded-md"
          />
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNext}
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
          >
            {currentIndex === questions.length - 1 ? 'Soumettre' : 'Suivant'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionnairePage;
