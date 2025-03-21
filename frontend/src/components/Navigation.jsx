import { useState } from "react";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { FaMale, FaFemale, FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../services/authApi";
import { logout } from "../services/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth); // ✅ Get user from Redux
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutApiCall] = useLogoutMutation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout()); // ✅ Clears Redux state

      Swal.fire({
        icon: "success",
        title: "Logged out successfully!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => navigate("/login"));
    } catch (err) {
      Swal.fire("Error", "An unexpected error occurred.", "error");
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 py-2">
      <div className="container-fluid">
        {/* Left Side (Logo & Menu) */}
        <button className="btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <AiOutlineMenu size={19} />
        </button>
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <span className="fs-3 fw-bold text-dark">thecircle</span>
          <span className="text-success fs-3 fw-bold">.</span>
        </Link>
          {/* Centered Search Bar */}
          <form className="d-flex mx-auto position-relative" style={{ maxWidth: "500px", width: "100%" }}>
          <input 
            className="form-control rounded-pill px-4 py-2 shadow-sm" 
            type="search" 
            placeholder="Matcha Protein Shake" 
            style={{ border: "1px solid #ccc", fontSize: "16px", outline: "none" }}
          />
          <button 
            className="btn position-absolute end-0 top-50 translate-middle-y rounded-circle bg-light border-0 p-2 me-2" 
            type="submit" 
            style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", outline: "none", boxShadow: "none" }}
          >
            <FaSearch className="text-secondary" style={{ fontSize: "18px" }} />
          </button>
        </form>

        {/* Right Side (User) */}
        <div className="d-flex align-items-center">
          {userInfo ? (
            <button className="btn d-flex align-items-center" onClick={toggleDropdown}>
            <img
              src={
                userInfo?.sex === "female"
                  ? "https://www.svgrepo.com/show/382097/female-avatar-girl-face-woman-user-9.svg"
                  : "https://www.svgrepo.com/show/382106/male-avatar-boy-face-man-user-9.svg"
              }
              alt="User Avatar"
              style={{ width: "30px", height: "30px", marginRight: "8px" }}
            />
            <span className="ms-2">{userInfo.username}</span>
            <i className="bi bi-chevron-down ms-1"></i>
          </button>
          ) : (
            <div>
              {/* Show Login & Signup Links if NOT logged in */}
              <Link to="/login" className="btn btn-outline-primary me-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline-success">
                Sign Up
              </Link>
            </div>
          )}

          {/* Dropdown Menu */}
          {dropdownOpen && userInfo && (
            <div className="dropdown-menu show position-absolute end-0 mt-2">
              <Link to="/profile" className="dropdown-item">My Profile</Link>
              <Link to="/password-settings" className="dropdown-item">Password Settings</Link>
              <button className="dropdown-item" onClick={logoutHandler}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
