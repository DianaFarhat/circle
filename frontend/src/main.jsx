import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom"; 
import { store } from "./store";
import Home from "./pages/Home.jsx";
import AllMeals from "./components/tabs/AllMeals.jsx";       // ✅ add this
import MyMeals from "./components/tabs/MyMeals.jsx";         // ✅ add this
import MyGroceries from "./components/tabs/MyGroceries.jsx"; // ✅ add this
import MealPlanPage from "./components/tabs/MealPlan.jsx"; // ✅ add this
import Login from "./pages/authentication/Login.jsx";
import Register from "./pages/authentication/Register.jsx";
import { Provider } from "react-redux";
import CreateMeal from "./pages/meals/CreateMeal.jsx";
import MealPage from "./pages/meals/MealPage.jsx";

// Define the router with App as a layout
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "", // ✅ this allows children below
        element: <Home />,
        children: [
          { index: true, element: <AllMeals /> },
          { path: "myMeals", element: <MyMeals /> },
          { path: "mealPlan", element: <MealPlanPage /> },
          { path: "myGroceries", element: <MyGroceries /> },
        ],
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "createmeal", element: <CreateMeal /> },
      { path: "meals/:mealId", element: <MealPage /> },
      {path: "editmeal/:mealId", element: <EditMeal />}, 

    ],
  },
]);

// Wrap the entire application inside <Provider>
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>  
    <RouterProvider router={router} />
  </Provider>
);

console.log('App mounted'); // Debugging check
