import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Required fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [role, setRole] = useState('user');
  const [birthdate, setBirthdate] = useState('');
  const [sex, setSex] = useState('female"'); // Enum: "male", "female"
  const [height, setHeight] = useState(155); // In cm
  const [weight, setWeight] = useState(55); // In kg
  const [activityLevel, setActivityLevel] = useState('Sedentary'); // Enum: Activity levels
  const [fitnessGoal, setFitnessGoal] = useState('Fat Loss'); // Enum: Fitness goals

  // Optional fields
  const [targetWeight, setTargetWeight] = useState('');
  const [dietaryPreferences, setDietaryPreferences] = useState([]); // Array of dietary preferences

  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
      setLoading(true); // Set button to "Logging in..."

    try {
     // Build the user object dynamically, excluding empty optional fields
      const userData = {
        firstName,
        lastName,
        email,
        username,
        password,
        passwordConfirm,
        role,
        birthdate,
        sex,
        height,
        weight,
        activityLevel,
        fitnessGoal,
        caloriesRecommended
      };

      // Only add optional fields if they have a value
      if (targetWeight) userData.targetWeight = targetWeight;
      if (dietaryPreferences.length > 0) userData.dietaryPreferences = dietaryPreferences;

      // ✅ Dispatch signup action
      const result = await dispatch(signup(userData)).unwrap(); 
      toast.success("User successfully registered"); 
      setTimeout(() => navigate("/Login"), 2000); 
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error occurred during signup');
      setLoading(false); // Reset button state on failure

    }
  };

 
 /*  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 sm:max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Create Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-sm"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            >
              Sign Up
            </button>
          </div>
        </form>

        {message && (
          <p className="mt-4 text-center text-red-500 text-sm">{message}</p>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  ); */

  return (
    <div className="min-h-screen flex flex-col items-center bg-lime-50 py-10">
      {/* 🍋 Cute Image */}
      <img
        src="https://cdn.pixabay.com/photo/2017/08/30/01/20/lemons-2691827_1280.jpg"
        alt="Cute Lemons"
        className="w-40 h-40 rounded-full shadow-lg mb-4"
      />

      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-lime-600 mb-6">Create Your Account</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-gray-700 text-sm font-medium">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-700 text-sm font-medium">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-gray-700 text-sm font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
            />
          </div>

          {/* Birthdate */}
          <div>
            <label className="block text-gray-700 text-sm font-medium">Birthdate</label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
            />
          </div>

          {/* Sex Dropdown */}
          <div>
            <label className="block text-gray-700 text-sm font-medium">Sex</label>
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>

          {/* Height Dropdown */}
          <div>
            <label className="block text-gray-700 text-sm font-medium">Height (cm)</label>
            <select
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
            >
              {Array.from({ length: 51 }, (_, i) => i + 140).map((h) => (
                <option key={h} value={h}>
                  {h} cm
                </option>
              ))}
            </select>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-gray-700 text-sm font-medium">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
            />
          </div>
        </form>
      </div>
    </div>
  );


};

export default SignUp;
