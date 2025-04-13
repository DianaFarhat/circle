import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useGetUserMealPlanQuery } from '../../services/mealPlanApi';
import { useSelector } from 'react-redux'; // To get current user


const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const MealPlan = () => {
  const currentUserId = useSelector((state) => state.auth.userInfo?._id);
  

  //Calendar Visible Range
  const [visibleRange, setVisibleRange] = useState({ start: null, end: null });
  const skip = !visibleRange.start || !visibleRange.end;

  useEffect(() => {
    const start = moment().startOf('month').toDate();
    const end = moment().endOf('month').toDate();
    setVisibleRange({ start, end });
  }, []);
  
  const { data: mealPlans, isLoading } = useGetUserMealPlanQuery(
    {
      startDate: visibleRange.start?.toISOString(),
      endDate: visibleRange.end?.toISOString(),
    },
    { skip }
  );

  //Set Meal Plans as Calendar Events
  const [events, setEvents] = useState([]);
  useEffect(() => {
    if (mealPlans && mealPlans.length > 0) {
      const transformed = mealPlans.map((plan) => ({
        id: plan._id,
        title: plan.meal?.name || 'Meal',
        start: new Date(plan.start),
        end: new Date(plan.end),
      }));
      setEvents(transformed);
    }
  }, [mealPlans]);
  

  const onEventResize = ({ event, start, end }) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === event.id ? { ...ev, start, end } : ev
      )
    );
  };
  

  const onEventDrop = ({ event, start, end }) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === event.id ? { ...ev, start, end } : ev
      )
    );
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
    <div style={{ width: '100%', height: '100vh' }} className="bg-white">
      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        onRangeChange={(range) => {
          if (Array.isArray(range)) {
            setVisibleRange({ start: range[0], end: range[range.length - 1] });
          } else {
            setVisibleRange({ start: range.start, end: range.end });
          }
        }}
        resizable
        style={{ height: '80vh' }}
      />

      {renderDayTotals()}
    </div>
  );
};

export default MealPlan;
