import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaBriefcase, FaCheckCircle } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-600 p-6 text-white flex flex-col items-center justify-center gap-12">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Welcome to DayJobs
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Profile Card */}
        <div
          onClick={() => navigate("/profile")}
          className="bg-white/20 backdrop-blur-md p-8 rounded-2xl flex flex-col items-center gap-4 shadow-lg cursor-pointer hover:scale-105 transition"
        >
          <FaUserCircle className="text-6xl" />
          <h2 className="text-xl font-semibold">Profile</h2>
          <p className="text-gray-200 text-center">View your profile and rating</p>
        </div>

        {/* Available Jobs Card */}
        <div
          onClick={() => navigate("/available-jobs")}
          className="bg-white/20 backdrop-blur-md p-8 rounded-2xl flex flex-col items-center gap-4 shadow-lg cursor-pointer hover:scale-105 transition"
        >
          <FaBriefcase className="text-6xl" />
          <h2 className="text-xl font-semibold">Available Jobs</h2>
          <p className="text-gray-200 text-center">
            Browse jobs you can accept or reject
          </p>
        </div>

        {/* Completed Jobs Card */}
        <div
          onClick={() => navigate("/completed-jobs")}
          className="bg-white/20 backdrop-blur-md p-8 rounded-2xl flex flex-col items-center gap-4 shadow-lg cursor-pointer hover:scale-105 transition"
        >
          <FaCheckCircle className="text-6xl" />
          <h2 className="text-xl font-semibold">Completed Jobs</h2>
          <p className="text-gray-200 text-center">
            Check your past completed jobs
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
