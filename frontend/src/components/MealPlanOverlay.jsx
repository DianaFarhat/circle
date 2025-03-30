import React from 'react';
import MealPlan from './tabs/MealPlan';
import { AiOutlineClose, AiOutlineExpandAlt, AiOutlineShrink } from 'react-icons/ai';

const MealPlanOverlay = ({ visible, onClose, fullWidth, onToggleWidth }) => {
  if (!visible) return null;

  return (
    <div
      className="position-absolute bg-white shadow-lg border-start"
      style={{
        top: 0,
        right: 0,
        width: fullWidth ? '100%' : '50%',
        height: '100%',
        zIndex: 10,
        transition: 'width 0.3s ease-in-out',
        overflowY: 'auto',
      }}
    >
      {/* Header with buttons */}
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
        <button className="btn btn-sm text-dark" onClick={onToggleWidth}>
          {fullWidth ? <AiOutlineShrink size={18} /> : <AiOutlineExpandAlt size={18} />}
        </button>
        <button className="btn btn-sm text-danger" onClick={onClose}>
          <AiOutlineClose size={20} />
        </button>
      </div>

      {/* Meal Plan Content */}
      <div className="p-4">
        <MealPlan />
      </div>
    </div>
  );
};

export default MealPlanOverlay;
