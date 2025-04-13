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
  
  //User Dietary Recommendations
  const userInfo = useSelector((state) => state.auth.userInfo);
  const caloriesTarget = userInfo?.caloriesRecommended || 2000;
  const proteinTarget = userInfo?.proteinRecommended || 75;


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
  

  // 🔄 Aggregate totals per day of the week
  const dailyTotals = Array(7).fill(0).map(() => ({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  }));

  if (mealPlans && mealPlans.length > 0) {
    mealPlans.forEach((plan) => {
      const date = new Date(plan.start);
      const dayIndex = date.getDay(); // 0 = Sunday, 6 = Saturday

      dailyTotals[dayIndex].calories += plan.nutrients?.calories || 0;
      dailyTotals[dayIndex].protein += plan.nutrients?.protein || 0;
      dailyTotals[dayIndex].carbs += plan.nutrients?.carbs || 0;
      dailyTotals[dayIndex].fats += plan.nutrients?.fats || 0;
    });
  }

  const renderDayTotals = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return (
      <div className="p-3 border-top bg-light">
        <h5 className="text-center mb-3">Daily Nutrient Summary</h5>
        <div className="row">
          {days.map((day, index) => {
            const daily = dailyTotals[index];
            const calories = Math.round(daily.calories);
            const protein = Math.round(daily.protein);
            const carbs = Math.round(daily.carbs);
            const fats = Math.round(daily.fats);
  
            const calDiff = caloriesTarget - calories;
            const proteinDiff = proteinTarget - protein;
  
            let message = null;
            let alertClass = "alert";
  
            if (calDiff >= 0 && proteinDiff <= 0) {
              message = "✅ On track! You hit your macros like a pro 💪";
              alertClass += " alert-success";
            } else {
              alertClass += " alert-warning";
              const proteinMsg =
                proteinDiff > 0
                  ? `You’re ${proteinDiff}g below your protein goal. `
                  : `Protein goal met 🎯. `;
              const calMsg =
                calDiff > 0
                  ? `You still have ${calDiff} kcal available.`
                  : `You are ${Math.abs(calDiff)} kcal above your calorie limit.`;
              message = `⚠️ ${proteinMsg}${calMsg}`;
            }
  
            return (
              <div key={index} className="col-md-3 mb-3">
                <div className="card p-2 shadow-sm">
                  <h6 className="text-dark mb-2">{day}</h6>
                  <small>Calories: {calories}</small><br />
                  <small>Proteins: {protein}g</small><br />
                  <small>Fats: {fats}g</small><br />
                  <small>Carbs: {carbs}g</small>
                  <div className={`${alertClass} py-1 px-2 mb-0 mt-2`}>
                    {message}
                  </div>
                </div>
              </div>
            );
          })}
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
