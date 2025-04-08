import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation"; // Bootstrap Navbar
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();

  // Hide Navigation on Login & Register pages
  const hideNavOnRoutes = ["/login", "/register"];
  const shouldShowNav = !hideNavOnRoutes.includes(location.pathname);

  return (
    <>
      <ToastContainer />
      {shouldShowNav && <Navigation />}
      
      <main className="container-fluid px-0">
        <Outlet />
      </main>
    </>
  );
}

export default App;
