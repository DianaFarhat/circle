import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation"; // Bootstrap Navbar
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';



function App() {
  const location = useLocation(); // ✅ Get the current route

  // ✅ Hide Navigation on Login & Register pages
  const hideNavOnRoutes = ["/login", "/register"];
  const shouldShowNav = !hideNavOnRoutes.includes(location.pathname);

  return (
    <>
     <DndProvider backend={HTML5Backend}>
      <ToastContainer />
      {shouldShowNav && <Navigation />}

      <main className="container-fluid px-0">
        <Outlet />
      </main>
    </DndProvider>
     
   </>
  );
}


export default App;
