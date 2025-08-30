import React, { useState, useEffect } from 'react';
import { GripVertical, AlertCircle, X } from 'lucide-react';

const RankingQuestion = ({ question, answer = [], onAnswer }) => {
  const [activeItems, setActiveItems] = useState([]);
  const [inactiveItems, setInactiveItems] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);

  useEffect(() => {
    // Initialize items from answer or from question options
    if (answer && answer.active && answer.active.length > 0) {
      setActiveItems(answer.active);
      setInactiveItems(answer.inactive || []);
    } else {
      // Default: all items are active
      setActiveItems(question.options.map(opt => opt.value));
      setInactiveItems([]);
    }
  }, [question.options, answer]);

  useEffect(() => {
    // Update parent whenever items change
    onAnswer({
      active: activeItems,
      inactive: inactiveItems
    });
  }, [activeItems, inactiveItems]);

  const handleDragStart = (e, index, isActive) => {
    setDraggedItem({ index, isActive });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index, isActive) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDraggedOverItem({ index, isActive });
  };

  const handleDragEnd = () => {
    if (draggedItem !== null && draggedOverItem !== null) {
      if (draggedItem.isActive === draggedOverItem.isActive) {
        // Reordering within the same list
        const items = draggedItem.isActive ? [...activeItems] : [...inactiveItems];
        const draggedContent = items[draggedItem.index];
        
        // Remove the dragged item
        items.splice(draggedItem.index, 1);
        
        // Insert it at the new position
        items.splice(draggedOverItem.index, 0, draggedContent);
        
        if (draggedItem.isActive) {
          setActiveItems(items);
        } else {
          setInactiveItems(items);
        }
      }
    }
    
    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  const moveItem = (index, direction, isActive) => {
    const items = isActive ? [...activeItems] : [...inactiveItems];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;
    
    const temp = items[index];
    items[index] = items[newIndex];
    items[newIndex] = temp;
    
    if (isActive) {
      setActiveItems(items);
    } else {
      setInactiveItems(items);
    }
  };

  const toggleItemRelevance = (item, isCurrentlyActive) => {
    if (isCurrentlyActive) {
      // Move from active to inactive
      setActiveItems(activeItems.filter(i => i !== item));
      setInactiveItems([...inactiveItems, item]);
    } else {
      // Move from inactive to active (add to end)
      setInactiveItems(inactiveItems.filter(i => i !== item));
      setActiveItems([...activeItems, item]);
    }
  };

  const getOptionLabel = (value) => {
    const option = question.options.find(opt => opt.value === value);
    return option ? option.label : value;
  };

  const getOptionDescription = (value) => {
    const option = question.options.find(opt => opt.value === value);
    return option ? option.description : '';
  };

  const renderItem = (item, index, isActive) => {
    const isBeingDragged = draggedItem && draggedItem.index === index && draggedItem.isActive === isActive;
    const isDraggedOver = draggedOverItem && draggedOverItem.index === index && draggedOverItem.isActive === isActive;
    
    return (
      <div
        key={item}
        draggable
        onDragStart={(e) => handleDragStart(e, index, isActive)}
        onDragOver={(e) => handleDragOver(e, index, isActive)}
        onDragEnd={handleDragEnd}
        className={`
          flex items-center p-4 bg-white border-2 rounded-lg cursor-move transition-all
          ${isBeingDragged ? 'opacity-50 border-blue-300' : ''}
          ${isDraggedOver ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
          ${!isActive ? 'opacity-60 bg-gray-50' : ''}
          hover:border-gray-300 hover:shadow-sm
        `}
      >
        {isActive && (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold mr-3">
            {index + 1}
          </div>
        )}
        
        <GripVertical className="w-5 h-5 text-gray-400 mr-3" />
        
        <div className="flex-1">
          <div className={`font-medium ${isActive ? 'text-gray-800' : 'text-gray-500 line-through'}`}>
            {getOptionLabel(item)}
          </div>
          {getOptionDescription(item) && (
            <div className={`text-sm mt-1 ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
              {getOptionDescription(item)}
            </div>
          )}
        </div>
        
        <button
          type="button"
          onClick={() => toggleItemRelevance(item, isActive)}
          className={`
            ml-3 px-3 py-1 text-xs rounded-full transition-colors
            ${isActive 
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' 
              : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
            }
          `}
          title={isActive ? 'Markeer als niet relevant' : 'Markeer als relevant'}
        >
          {isActive ? 'Niet relevant' : 'Relevant'}
        </button>
        
        {isActive && (
          <div className="flex flex-col gap-1 ml-3">
            <button
              type="button"
              onClick={() => moveItem(index, 'up', isActive)}
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
              onClick={() => moveItem(index, 'down', isActive)}
              disabled={index === activeItems.length - 1}
              className={`
                px-2 py-1 text-xs rounded transition-colors
                ${index === activeItems.length - 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }
              `}
            >
              ↓
            </button>
          </div>
        )}
      </div>
    );
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
      
      {activeItems.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Relevante risico's (in volgorde van prioriteit):</h4>
          <div className="space-y-2">
            {activeItems.map((item, index) => renderItem(item, index, true))}
          </div>
        </div>
      )}
      
      {inactiveItems.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Niet relevant voor uw organisatie:</h4>
          <div className="space-y-2 opacity-75">
            {inactiveItems.map((item, index) => renderItem(item, index, false))}
          </div>
        </div>
      )}
      
      {activeItems.length === 0 && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            Selecteer minimaal één relevant risico voor uw organisatie
          </p>
        </div>
      )}
      
      <p className="text-sm text-gray-500 italic">
        Sleep items om de volgorde aan te passen. Klik "Niet relevant" voor risico's die niet van toepassing zijn.
      </p>
    </div>
  );
};

export default RankingQuestion;