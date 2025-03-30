import React from "react";
import { useState } from "react";
import { useSelector } from 'react-redux';
import MultiTabComponent from "../components/MultiTab";
import AllMeals from '../components/tabs/AllMeals';
import MyMeals from '../components/tabs/MyMeals';
import MyGroceries from '../components/tabs/MyGroceries';
import MealPlanOverlay from "../components/MealPlanOverlay";

const Home = () => {

  //Step 0: Get Current User
  const userId = useSelector((state) => state.auth.userInfo?._id);
  
  //Calendar
  const [showMealPlan, setShowMealPlan] = useState(false);  // ✅
  const [fullWidth, setFullWidth] = useState(false);  

  // Step 1: State to manage the active tab
  const [activeTab, setActiveTab] = useState('allMeals');

  // Step 2: Function to update the active tab state
  const onTabClick = (id) => {
    setActiveTab(id);
    localStorage.setItem('activeTab', id);  // Persist the active tab to localStorage
  };
  // Step 3: Render the content based on the active tab
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

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <MultiTabComponent  activeTab={activeTab} onTabClick={onTabClick}  onCalendarClick={() => setShowMealPlan(prev => !prev)}/>
      <div className="mt-3">
        {renderTabContent()}

          {/* Overlay */}
          <MealPlanOverlay
          visible={showMealPlan}
          onClose={() => setShowMealPlan(false)}
          fullWidth={fullWidth}
          onToggleWidth={() => setFullWidth(prev => !prev)}
        />
        </div>
      
     
    </div>
  );
};

export default Home;
