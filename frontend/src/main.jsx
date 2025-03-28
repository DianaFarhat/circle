import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom"; 
import { store } from "./store";
import Home from "./pages/Home.jsx";
import Login from "./pages/authentication/Login.jsx";
import Register from "./pages/authentication/Register.jsx";
import { Provider } from "react-redux";
import CreateMeal from "./pages/meals/CreateMeal.jsx";
import MealPage from "./pages/meals/MealPage.jsx";

// Define the router with App as a layout
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // `App.jsx` is the layout
    children: [
      { index: true, element: <Home /> }, // Home page
      { path: "login", element: <Login /> }, // Login page
      { path: "register", element: <Register /> }, // Register page
      {path: "createmeal", element: <CreateMeal/>}, //Create Meal Page, which probably will need to be nested further but till now
      { path: "/:mealId", element: <MealPage /> },
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
