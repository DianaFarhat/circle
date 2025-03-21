import React from "react";
import { useState } from "react";
import MultiTabComponent from "../components/MultiTab";
import TagFilterComponent from "../components/TagFilter";
import AllMeals from '../components/AllMeals';
import MyMeals from '../components/MyMeals';
import MealPlan from '../components/MealPlan';
import MyGroceries from '../components/MyGroceries';

const Home = () => {

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
      case 'mealPlan':
        return <MealPlan />;
      case 'myGroceries':
        return <MyGroceries />;
      default:
        return <AllMeals />;
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <MultiTabComponent  activeTab={activeTab} onTabClick={onTabClick}/>
      <div className="mt-3">
        {renderTabContent()}
      </div>
      
     
    </div>
  );
};

export default Home;
