import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation.jsx"; // Bootstrap Navbar
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./redux/store"; 
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Bootstrap CSS globally
import "bootstrap/dist/js/bootstrap.bundle.min"; // ✅ Bootstrap JS (for modals, dropdowns, etc.)

import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter } from "react-router-dom"; 
import ReactDOM from "react-dom/client";

function App() {
  return (
    <>
  <Provider store={store}>  
  <ToastContainer />
   <Navigation/>
   <main className=''>
    <Outlet/>
   </main>
   </Provider>
   </>
  );
}


export default App;
