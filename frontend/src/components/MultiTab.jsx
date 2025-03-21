import React, { useState } from 'react';
import { AiOutlineUnorderedList, AiOutlineStar, AiOutlineCalendar, AiOutlineApple } from 'react-icons/ai';

const tabs = [
  { name: 'All Meals', id: 'allMeals', icon: <AiOutlineUnorderedList /> },
  { name: 'My Meals', id: 'myMeals', icon: <AiOutlineStar /> },
  { name: 'Meal Plan', id: 'mealPlan', icon: <AiOutlineCalendar /> },
  { name: 'My Groceries', id: 'myGroceries', icon: <AiOutlineApple /> },
];

const MultiTabComponent = () => {
  const [activeTab, setActiveTab] = useState('allMeals');

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white py-2 border-t-4 border-b-4 border-lime-500">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`
              flex items-center space-x-2 px-4 py-2 text-lg font-medium text-gray-600
              transition-all duration-200
              ${activeTab === tab.id ? 'text-yellow-500 border-b-2 border-yellow-500' : 'hover:text-gray-800'}
            `}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultiTabComponent;
