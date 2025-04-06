import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AiOutlineClose, AiOutlineExpandAlt, AiOutlineShrink } from 'react-icons/ai';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { useAddMealToPlanMutation, useRemoveMealFromPlanMutation, useGetUserMealPlanQuery } from '../services/mealPlanApi'; 

const DnDCalendar = withDragAndDrop(Calendar);


const localizer = momentLocalizer(moment);

const MealPlanOverlay = ({ visible, onClose, fullWidth, onToggleWidth, userId }) => {
  const [events, setEvents] = useState([]);
  const [draggedMeal, setDraggedMeal] = useState(null);

  const [addMealToPlan] = useAddMealToPlanMutation();
  const [removeMealFromPlan] = useRemoveMealFromPlanMutation();

  // Date range
  const startDate = new Date().toISOString();
  const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  // RTK Query fetch
  const { data, isLoading, isError } = useGetUserMealPlanQuery(
    { userId, startDate, endDate },
    { skip: !visible || !userId }
  );

  // Update events when data comes in
  useEffect(() => {
    if (data) {
      const formatted = data.map((meal) => ({
        id: meal._id,
        title: meal.meal.name,
        start: new Date(meal.start),
        end: new Date(meal.end),
        calories: meal.meal.calories,
        protein: meal.meal.protein,
        carbs: meal.meal.carbs,
        fat: meal.meal.fat,
      }));      
      setEvents(formatted);
    }
  }, [data]);

  const handleExternalDrop = async ({ start, end }) => {
    if (!draggedMeal || !userId) return;

    try {
      const res = await addMealToPlan({
        userId,
        mealId: draggedMeal._id,
        start,
        end,
        nutrients: {
          calories: draggedMeal.calories || 0,
          protein: draggedMeal.protein || 0,
          carbs: draggedMeal.carbs || 0,
          fats: (draggedMeal.saturatedFats || 0) + (draggedMeal.unsaturatedFats || 0),
        }  
      }).unwrap();

      setEvents((prev) => [
        ...prev,
        {
          id: res._id,
          title: draggedMeal.name,
          start: new Date(res.start),
          end: new Date(res.end),
        },
      ]);
    } catch (err) {
      console.error('Failed to add meal:', err);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await removeMealFromPlan(eventId).unwrap();
      setEvents((prev) => prev.filter((e) => e.id !== eventId));
    } catch (err) {
      console.error('Failed to delete event:', err);
    }
  };

  const getEventStyle = () => ({
    className: 'custom-event',
    style: {
      backgroundColor: '#82c91e',
      color: '#fff',
    },
  });
  
  const CustomEvent = ({ event }) => (
    <div className="p-1">
      <div className="d-flex justify-content-between align-items-center">
        <strong>{event.title}</strong>
        <AiOutlineClose
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(event.id);
          }}
          style={{ marginLeft: 6, cursor: 'pointer' }}
        />
      </div>
      <small>
        🔥 {event.calories || 0} kcal |
        🥩 {event.protein || 0}g P |
        🍚 {event.carbs || 0}g C |
        🧈 {event.fat || 0}g F
      </small>
    </div>
  );
  
  
  if (!visible) return null;



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
