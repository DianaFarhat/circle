import React, { useState } from "react";
import { useSelector } from 'react-redux';
import MultiTabComponent from "../components/MultiTab";
import AllMeals from '../components/tabs/AllMeals';
import MyMeals from '../components/tabs/MyMeals';
import MyGroceries from '../components/tabs/MyGroceries';
import MealPlanOverlay from "../components/MealPlanOverlay";
import { DndContext} from '@dnd-kit/core';

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
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over) {
      console.log(`Dropped ${active.id} onto ${over.id}`);
      // You can update state or send data to backend here
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <MultiTabComponent
          activeTab={activeTab}
          onTabClick={onTabClick}
          onCalendarClick={() => setShowMealPlan(prev => !prev)}
        />
        <div className="mt-3">
          {renderTabContent()}
          <MealPlanOverlay
            visible={showMealPlan}
            onClose={() => setShowMealPlan(false)}
            fullWidth={fullWidth}
            onToggleWidth={() => setFullWidth(prev => !prev)}
          />
        </div>
      </div>
    </DndContext>
  );
};

export default Home;
