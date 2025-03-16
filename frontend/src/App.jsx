import './App.css';
import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./redux/store"; 
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
