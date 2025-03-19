import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation"; // Bootstrap Navbar
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  return (
    <>
    <ToastContainer />
    <Navigation/>
    <main className="container-fluid px-0">
      <Outlet/>
    </main>
     
   </>
  );
}


export default App;
