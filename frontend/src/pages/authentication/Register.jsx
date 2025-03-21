import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSignupMutation } from "../../services/authApi";

const SignUp = () => {
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();

  // State Management
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [birthdate, setBirthdate] = useState('2000-08-29');
  const [sex, setSex] = useState('female');
  const [height, setHeight] = useState(155);
  const [weight, setWeight] = useState(60);
  const [targetWeight, setTargetWeight] = useState(55);
  const [activityLevel, setActivityLevel] = useState('Lightly Active');
  const [fitnessGoal, setFitnessGoal] = useState('Fat Loss');
  const [dietaryPreferences, setDietaryPreferences] = useState('Other');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match!");
      return;
    }
   

    try {
      const userData = {
        firstName, lastName, email, password, passwordConfirm, birthdate, sex,
        height, weight, targetWeight, activityLevel, fitnessGoal, dietaryPreferences
      };

      console.log("User Data Sent from register.jsx frontend:", JSON.stringify(userData));  // Log the user data

      
      const response= await signup(userData).unwrap(); 
      toast.success("User successfully registered");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      if (error?.status === 409 && error?.data?.message === "Email already in use.") {
        toast.error("This email is already registered, please use a different email.");
      } else {
        toast.error(error?.data?.message || 'Error occurred during signup');
      }

    }
  };

  return (
    <div className="container min-vh-100 d-flex flex-column align-items-center py-4">
      

      {/* Fitness Image */}
      <div className="w-100 position-relative" style={{ height: "200px", overflow: "hidden" }}>
        <img 
          src="https://images.pexels.com/photos/450062/pexels-photo-450062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Fitness Motivation" 
          className="w-100 h-100"
          style={{ objectFit: "cover", objectPosition: "55% 65%", maxWidth: "100%" }}
        />
      </div>



      <div className="w-100 bg-white shadow-lg rounded p-4 w-100">
      <h2 className="fw-bold mb-3">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="row g-3">
          {/* LEFT COLUMN - User Info */}
          <div className="col-md-6">
            <label className="form-label">First Name</label>
            <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />

            <label className="form-label mt-2">Last Name</label>
            <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} required />

            <label className="form-label mt-2">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label className="form-label mt-2">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <label className="form-label mt-2">Confirm Password</label>
            <input type="password" className="form-control" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required />

            <label className="form-label mt-2">Birthdate</label>
            <input type="date" className="form-control" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />

            <label className="form-label mt-2">Sex</label>
            <div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="sex" value="female" checked={sex === "female"} onChange={() => setSex("female")} />
                <label className="form-check-label">Female</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="sex" value="male" checked={sex === "male"} onChange={() => setSex("male")} />
                <label className="form-check-label">Male</label>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Fitness Info */}
          <div className="col-md-6">
            <label className="form-label">Height (cm)</label>
            <select className="form-select" value={height} onChange={(e) => setHeight(parseInt(e.target.value))}>
              {Array.from({ length: 51 }, (_, i) => i + 140).map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>

            <label className="form-label mt-2">Weight (kg)</label>
            <input type="number" className="form-control" value={weight} onChange={(e) => setWeight(e.target.value)} />

            <label className="form-label mt-2">Target Weight (kg)</label>
            <input type="number" className="form-control" value={targetWeight} onChange={(e) => setTargetWeight(e.target.value)} />

            <label className="form-label mt-2">Activity Level</label>
            <select className="form-select" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
              {["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Extremely Active"].map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>

            <label className="form-label mt-2">Fitness Goal</label>
            <select className="form-select" value={fitnessGoal} onChange={(e) => setFitnessGoal(e.target.value)}>
              {["Bulking","Fat Loss", "Muscle Gain", "Maintenance"].map(goal => (
                <option key={goal} value={goal}>{goal}</option>
              ))}
            </select>

            <label className="form-label mt-2">Dietary Preferences</label>
            <select className="form-select" value={dietaryPreferences} onChange={(e) => setDietaryPreferences(e.target.value)}>
              {["Vegetarian", "Vegan", "Paleo", "Gluten-Free", "Keto", "Other"].map(pref => (
                <option key={pref} value={pref}>{pref}</option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-success w-50" disabled={isLoading}>
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
          <div className="mt-3 text-center">
              <p className="small">Already have an account? <Link to="/login" className="text-primary">Log in</Link></p>
            </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
