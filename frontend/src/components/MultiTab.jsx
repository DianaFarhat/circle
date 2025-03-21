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
    <div className="d-flex flex-column align-items-start justify-content-center py-2 bg-white">
      <div className="d-flex position-relative">
        {/* Continuous Yellow Line Below Tabs */}
        <div className="position-absolute bottom-0 start-0 w-100" style={{ height: '4px', backgroundColor: '#FFEA00' }}></div>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`btn mx-1 py-2 px-3 fw-bold text-dark border-0 ${activeTab === tab.id ? 'active-tab' : ''}`}
            style={{
              backgroundColor: activeTab === tab.id ? '#FAFA33' : '#FDFD96',
              outline: 'none',
              boxShadow: 'none',
            }}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.icon}
            <span className="ms-1">{tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultiTabComponent;
