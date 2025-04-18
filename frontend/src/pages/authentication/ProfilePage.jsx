import React from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.userInfo);

  if (!user) return <div className="text-center mt-10 text-yellow-600">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-start py-12 px-4">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden border border-green-200">

        {/* Left Side - Avatar & Work Info */}
        <div className="md:w-1/3 bg-yellow-50 p-6 flex flex-col items-center border-r border-green-100">
          <img
            src="https://i.pravatar.cc/150?img=10"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-green-300 mb-4"
          />
          <h2 className="text-xl font-semibold text-green-800">{user.firstName} {user.lastName}</h2>
          <p className="text-sm text-gray-500">{user.fitnessGoal}</p>

          <div className="mt-6 w-full">
            <h3 className="text-green-700 font-medium mb-2">Contact Info</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>Email: <span className="text-blue-600">{user.email}</span></li>
              <li>Height: {user.height} cm</li>
              <li>Weight: {user.weight} kg</li>
              <li>Target: {user.targetWeight || "N/A"} kg</li>
            </ul>
          </div>
        </div>

        {/* Right Side - Main Details */}
        <div className="md:w-2/3 p-6">
          <h3 className="text-lg font-semibold text-green-800 border-b pb-2 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-800">
            <div>
              <p className="font-medium text-green-700">Birthday:</p>
              <p>{new Date(user.birthdate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-medium text-green-700">Sex:</p>
              <p className="capitalize">{user.sex}</p>
            </div>
            <div>
              <p className="font-medium text-green-700">Age:</p>
              <p>{user.age}</p>
            </div>
            <div>
              <p className="font-medium text-green-700">Activity Level:</p>
              <p>{user.activityLevel}</p>
            </div>
            <div>
              <p className="font-medium text-green-700">Dietary Preference:</p>
              <p>{user.dietaryPreferences}</p>
            </div>
            <div>
              <p className="font-medium text-green-700">Calories Recommended:</p>
              <p>{user.caloriesRecommended} kcal</p>
            </div>
            <div>
              <p className="font-medium text-green-700">Protein Recommended:</p>
              <p>{user.proteinRecommended} g</p>
            </div>
          </div>

          <div className="mt-6">
            <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded mr-3">Send Message</button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium px-4 py-2 rounded">Contact</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
