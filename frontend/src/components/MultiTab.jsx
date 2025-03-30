import React from 'react';
import { AiOutlineUnorderedList, AiOutlineStar, AiOutlineCalendar, AiOutlineApple } from 'react-icons/ai';

const tabs = [
  { name: 'All Meals', id: 'allMeals', icon: <AiOutlineUnorderedList /> },
  { name: 'My Meals', id: 'myMeals', icon: <AiOutlineStar /> },
  { name: 'My Groceries', id: 'myGroceries', icon: <AiOutlineApple /> },
];

const MultiTabComponent = ({ activeTab, onTabClick, onCalendarClick }) => {
  return (
    <div className="d-flex flex-column align-items-start justify-content-center bg-white w-100">
      <div className="d-flex position-relative w-100 align-items-center">
        {/* Gradient Line */}
        <div
          className="position-absolute bottom-0 start-0"
          style={{
            height: '4px',
            width: '100vw',
            background: 'linear-gradient(to right, #FAFA33, #FDFD96)',
            opacity: '0.7',
          }}
        ></div>

        {/* Tabs */}
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`btn mx-0 py-2 px-3 fw-bold text-dark border-0 ${
              activeTab === tab.id ? 'active-tab' : ''
            }`}
            style={{
              marginRight: '8px',
              backgroundColor: activeTab === tab.id ? '#FAFA33' : '#ffff99',
              outline: 'none',
              boxShadow: 'none',
            }}
            onClick={() => onTabClick(tab.id)}
          >
            {tab.icon}
            <span className="ms-1">{tab.name}</span>
          </button>
        ))}

        {/* Plain Calendar Icon (Right-Aligned, Clickable) */}
        <div className="ms-auto pe-2">
          <AiOutlineCalendar
            size={22}
            style={{ color: 'green', cursor: 'pointer' }}
            onClick={onCalendarClick}
            title="Meal Plan"
          />
        </div>
      </div>
    </div>
  );
};

export default MultiTabComponent;
