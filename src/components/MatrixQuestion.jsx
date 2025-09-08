import React from 'react';

const MatrixQuestion = ({ question, answer = {}, onAnswer }) => {
  const handleChange = (item, value) => {
    const newAnswers = {
      ...answer,
      [item]: value
    };
    onAnswer(newAnswers);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">{question.question}</h3>
      {question.hint && (
        <p className="text-sm text-gray-600">{question.hint}</p>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-3 border-b-2 border-gray-200 font-medium text-gray-700">
                {question.rowLabel || 'Item'}
              </th>
              {question.columns.map((col) => (
                <th key={col.value} className="text-center p-3 border-b-2 border-gray-200 font-medium text-gray-700 min-w-[120px]">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {question.rows.map((row, index) => (
              <tr key={row.value} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="p-3 border-b border-gray-200 font-medium text-gray-800">
                  {row.label}
                  {row.description && (
                    <span className="block text-sm text-gray-600 font-normal mt-1">
                      {row.description}
                    </span>
                  )}
                </td>
                {question.columns.map((col) => (
                  <td key={col.value} className="text-center p-3 border-b border-gray-200">
                    <label className="inline-flex items-center justify-center cursor-pointer">
                      <input
                        type="radio"
                        name={`matrix-${row.value}`}
                        className="sr-only"
                        checked={answer[row.value] === col.value}
                        onChange={() => handleChange(row.value, col.value)}
                      />
                      <div className={`
                        w-5 h-5 rounded-full border-2 transition-all
                        ${answer[row.value] === col.value
                          ? 'border-[#379ADC] bg-[#379ADC] ring-2 ring-blue-200'
                          : 'border-gray-300 hover:border-gray-400 bg-white'
                        }
                      `}>
                        {answer[row.value] === col.value && (
                          <div className="w-full h-full rounded-full bg-white scale-50" />
                        )}
                      </div>
                    </label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatrixQuestion;