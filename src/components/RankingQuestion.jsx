import React, { useState, useEffect } from 'react';
import { GripVertical, AlertCircle } from 'lucide-react';

const RankingQuestion = ({ question, answer = [], onAnswer }) => {
  const [items, setItems] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);

  useEffect(() => {
    // Initialize items from answer or from question options
    if (answer && answer.length > 0) {
      setItems(answer);
    } else {
      setItems(question.options.map(opt => opt.value));
    }
  }, [question.options, answer]);

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDraggedOverItem(index);
  };

  const handleDragEnd = () => {
    if (draggedItem !== null && draggedOverItem !== null && draggedItem !== draggedOverItem) {
      const newItems = [...items];
      const draggedContent = newItems[draggedItem];
      
      // Remove the dragged item
      newItems.splice(draggedItem, 1);
      
      // Insert it at the new position
      newItems.splice(draggedOverItem, 0, draggedContent);
      
      setItems(newItems);
      onAnswer(newItems);
    }
    
    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  const moveItem = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;
    
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[newIndex];
    newItems[newIndex] = temp;
    
    setItems(newItems);
    onAnswer(newItems);
  };

  const getOptionLabel = (value) => {
    const option = question.options.find(opt => opt.value === value);
    return option ? option.label : value;
  };

  const getOptionDescription = (value) => {
    const option = question.options.find(opt => opt.value === value);
    return option ? option.description : '';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">{question.question}</h3>
      {question.hint && (
        <p className="text-sm text-gray-600 flex items-start">
          <AlertCircle className="w-4 h-4 mr-1 mt-0.5 text-blue-500" />
          {question.hint}
        </p>
      )}
      
      <div className="space-y-2">
        {items.map((item, index) => {
          const isBeingDragged = draggedItem === index;
          const isDraggedOver = draggedOverItem === index;
          
          return (
            <div
              key={item}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`
                flex items-center p-4 bg-white border-2 rounded-lg cursor-move transition-all
                ${isBeingDragged ? 'opacity-50 border-blue-300' : ''}
                ${isDraggedOver ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                hover:border-gray-300 hover:shadow-sm
              `}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold mr-3">
                {index + 1}
              </div>
              
              <GripVertical className="w-5 h-5 text-gray-400 mr-3" />
              
              <div className="flex-1">
                <div className="font-medium text-gray-800">
                  {getOptionLabel(item)}
                </div>
                {getOptionDescription(item) && (
                  <div className="text-sm text-gray-600 mt-1">
                    {getOptionDescription(item)}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col gap-1 ml-3">
                <button
                  type="button"
                  onClick={() => moveItem(index, 'up')}
                  disabled={index === 0}
                  className={`
                    px-2 py-1 text-xs rounded transition-colors
                    ${index === 0 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }
                  `}
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(index, 'down')}
                  disabled={index === items.length - 1}
                  className={`
                    px-2 py-1 text-xs rounded transition-colors
                    ${index === items.length - 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }
                  `}
                >
                  ↓
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      <p className="text-sm text-gray-500 italic">
        Sleep de items of gebruik de pijltjes om de volgorde aan te passen. 
        Item 1 heeft de hoogste prioriteit.
      </p>
    </div>
  );
};

export default RankingQuestion;