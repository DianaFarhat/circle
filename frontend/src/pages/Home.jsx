import React, { useState } from "react";
import { useSelector } from 'react-redux';
import MultiTabComponent from "../components/MultiTab";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";


const Home = () => {
  // Get Current User
  const userId = useSelector((state) => state.auth.userInfo?._id);

   // Routing
   const location = useLocation();
   const navigate = useNavigate();
 
   // Detect active tab from path
   const getActiveTabFromPath = () => {
     if (location.pathname.includes("myMeals")) return "myMeals";
     if (location.pathname.includes("mealPlan")) return "mealPlan";
     if (location.pathname.includes("myGroceries")) return "myGroceries";
  
     return "allMeals";
   };
 
   const activeTab = getActiveTabFromPath();
 
   const onTabClick = (id) => {
    if (id === "allMeals") navigate("/");
    else navigate(`/${id}`);
  };

  return (
    <div className="relative h-screen bg-gray-100">
      <MultiTabComponent activeTab={activeTab} onTabClick={onTabClick} />
      <div className="mt-3 relative z-0">
        <Outlet />
      </div>
    </div>
  );
 

  
};

export default Home;
