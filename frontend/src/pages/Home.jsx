import React, { useState } from "react";
import { useSelector } from 'react-redux';
import MultiTabComponent from "../components/MultiTab";
import AllMeals from '../components/tabs/AllMeals';
import MyMeals from '../components/tabs/MyMeals';
import MyGroceries from '../components/tabs/MyGroceries';
import MealPlanOverlay from "../components/MealPlanOverlay";
import { DndContext} from '@dnd-kit/core';
import { useAddMealToPlanMutation } from "../services/mealPlanApi";



const Home = () => {
  // Step 0: Get Current User
  const userId = useSelector((state) => state.auth.userInfo?._id);

  // Calendar state
  const [showMealPlan, setShowMealPlan] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);

  // Active tab state
  const [activeTab, setActiveTab] = useState('allMeals');

  // Update active tab and save to localStorage
  const onTabClick = (id) => {
    setActiveTab(id);
    localStorage.setItem('activeTab', id);
  };

  // Render content for each tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'allMeals':
        return <AllMeals />;
      case 'myMeals':
        return <MyMeals />;
      case 'myGroceries':
        return <MyGroceries />;
      default:
        return <AllMeals />;
    }
  };

  // Handle drop
  const [addMealToPlan] = useAddMealToPlanMutation();
  const handleDragEnd = async ({ active, over }) => {
    if (!over || !active?.data?.current?.meal) return;
  
    const meal = active.data.current.meal;
    const [dayRaw, timeRaw] = over.id.split('-');
    const day = dayRaw.charAt(0).toUpperCase() + dayRaw.slice(1);
    const fullTime = timeRaw.replace(/\s/g, ''); // e.g. "10:30AM"
  
    // Convert day + time to actual datetime
    const now = moment();
    const targetDate = moment().day(day).hour(0).minute(0); // beginning of day
  
    const timeParsed = moment(fullTime, ['h:mmA', 'H:mm']);
    targetDate.hour(timeParsed.hour()).minute(timeParsed.minute());
  
    const start = targetDate.toDate();
    const end = moment(start).add(30, 'minutes').toDate();
  
    try {
      await addMealToPlan({
        userId: meal.createdBy,
        mealId: meal._id,
        start,
        end,
        nutrients: {
          calories: meal.calories || 0,
          protein: meal.protein || 0,
          carbs: meal.carbs || 0,
          fats: (meal.saturatedFats || 0) + (meal.unsaturatedFats || 0),
        },
      }).unwrap();
  
      // Optionally refetch meal plan events
    } catch (err) {
      console.error('Failed to add meal to plan:', err);
    }
  };

  return (
      <DndContext onDragEnd={handleDragEnd}>
      <div className="relative h-screen bg-gray-100"> {/* ✅ relative container */}
        <MultiTabComponent
          activeTab={activeTab}
          onTabClick={onTabClick}
          onCalendarClick={() => setShowMealPlan(prev => !prev)}
        />
        
        <div className="mt-3 relative z-0"> {/* ✅ main content is behind the overlay */}
          {renderTabContent()}
        </div>
  
        <MealPlanOverlay
          visible={showMealPlan}
          onClose={() => setShowMealPlan(false)}
          fullWidth={fullWidth}
          onToggleWidth={() => setFullWidth(prev => !prev)}
        />
      </div>
    </DndContext>
 
    
  );
};

export default Home;
