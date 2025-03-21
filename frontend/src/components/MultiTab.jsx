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
    <div className="flex flex-col items-center justify-center py-2 bg-white">
      <div className="flex space-x-2 relative">
        {/* Continuous Yellow Line Below Tabs */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FFEA00] rounded"></div>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`
              flex items-center space-x-2 px-4 py-2 text-lg font-medium
              transition-all duration-200 ease-in-out
              ${activeTab === tab.id ? 'text-black bg-[#FFF59D] rounded-t-md border-b-0' : 'text-gray-700 bg-[#FFFBCC] hover:bg-[#FFF59D]'}
            `}
            style={{ borderBottom: activeTab === tab.id ? '4px solid #FFEA00' : '4px solid transparent' }}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.icon}
            <span> {tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultiTabComponent;
