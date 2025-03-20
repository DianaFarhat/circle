import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoginMutation } from "../../services/authApi";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/login";
    const [login, { isLoading }] = useLoginMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password }).unwrap();
            toast.success("User successfully Logged in!");
            setTimeout(() => navigate("/"), 2000);
        } catch (err) {
            toast.error(err?.data?.message || "Error occurred during login");
        }
    };

    // Prevents logged-in users from seeing the login page (redirects them to /)
    useEffect(() => {
        if (userInfo) navigate(redirect);
    }, [navigate, redirect, userInfo]);

    return (
      <div className="container-fluid d-flex flex-column flex-lg-row vh-100">
        <div 
          className="d-none d-lg-flex col-lg-6 bg-dark position-relative text-white align-items-center justify-content-center"
          style={{ backgroundImage: "url('https://i.pinimg.com/736x/24/38/ea/2438eaf6806ab272433ce39ae30f7413.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
          <div className="position-relative text-center">
            <h1 className="fw-bold">Welcome to The Circle</h1>
            <p>The circle of people committed to reaching their peak physique.</p>
          </div>
        </div>

        <div className="col-12 col-lg-6 d-flex flex-column align-items-center justify-content-center p-4">
          <form className="bg-white shadow p-4 rounded w-100" style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
            <h2 className="fw-bold mb-3">Login</h2>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-success w-100" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
            <div className="mt-3 text-center">
              <p className="small">Don't have an account? <Link to="/register" className="text-primary">Sign Up</Link></p>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    );
};

export default Login;