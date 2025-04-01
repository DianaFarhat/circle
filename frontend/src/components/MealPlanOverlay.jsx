import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AiOutlineClose, AiOutlineExpandAlt, AiOutlineShrink } from 'react-icons/ai';

const localizer = momentLocalizer(moment);

const MealPlanOverlay = ({ visible, onClose, fullWidth, onToggleWidth, events }) => {
  if (!visible) return null;

  const getEventStyle = (event) => {
    return {
      style: {
        backgroundColor: event.color || '#28a745',
        borderRadius: '5px',
        color: 'white',
        border: 'none',
        padding: '4px',
      },
    };
  };

  const renderDayTotals = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return (
      <div className="p-3 border-top bg-light">
        <h5 className="text-center mb-3">Daily Nutrient Summary</h5>
        <div className="row">
          {days.map((day, index) => (
            <div key={index} className="col-md-3 mb-3">
              <div className="card p-2 shadow-sm">
                <h6 className="text-success">{day}</h6>
                <small>Calories: 0</small><br />
                <small>Proteins: 0g</small><br />
                <small>Fats: 0g</small><br />
                <small>Carbs: 0g</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

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
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
        <button className="btn btn-sm text-dark" onClick={onToggleWidth}>
          {fullWidth ? <AiOutlineShrink size={18} /> : <AiOutlineExpandAlt size={18} />}
        </button>
        <button className="btn btn-sm text-danger" onClick={onClose}>
          <AiOutlineClose size={20} />
        </button>
      </div>

      <div className="p-3">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          style={{ height: '70vh' }}
          eventPropGetter={getEventStyle}
        />
      </div>

      {renderDayTotals()}
    </div>
  );
};

export default MealPlanOverlay;
