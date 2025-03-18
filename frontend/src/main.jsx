import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom"; 
import { Provider } from "react-redux";
import { store } from "./store.js"; 
import Home from "./pages/Home.jsx";

// Define the router correctly
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}> 
      <Route index element={<Home />} />  {/* This is the default route (Home) */}
    </Route>
  )
);

// Wrap the entire application inside <Provider>
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>  
    <RouterProvider router={router} />
  </Provider>
);

console.log('App mounted'); // Debugging check
