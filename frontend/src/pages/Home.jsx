import React from "react";
import MultiTabComponent from "../components/MultiTab";
const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <MultiTabComponent/>
      <h1 className="text-4xl font-bold text-gray-800">Welcome Home</h1>
    </div>
  );
};

export default Home;
