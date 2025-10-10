import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaUserCircle, FaBriefcase, FaCheckCircle, FaRocket, FaChartLine, FaBell } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const quickActions = [
    {
      title: "My Profile",
      description: "View and edit your profile",
      icon: FaUserCircle,
      color: "from-purple-500 to-pink-500",
      hoverColor: "from-purple-600 to-pink-600",
      path: "/profile"
    },
    {
      title: "Available Jobs",
      description: "Browse and accept new opportunities",
      icon: FaBriefcase,
      color: "from-blue-500 to-cyan-500",
      hoverColor: "from-blue-600 to-cyan-600",
      path: "/available-jobs"
    },
    {
      title: "My Jobs",
      description: "Track your accepted jobs",
      icon: FaCheckCircle,
      color: "from-green-500 to-emerald-500",
      hoverColor: "from-green-600 to-emerald-600",
      path: "/completed-jobs"
    }
  ];

  const stats = [
    { label: "Jobs Completed", value: "0", icon: FaChartLine },
    { label: "Rating", value: "5.0", icon: FaRocket },
    { label: "Notifications", value: "3", icon: FaBell }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-gray-600 text-lg">Ready to find your next opportunity?</p>
            </div>
            
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quickActions.map((action, index) => (
            <div
              key={index}
              onClick={() => navigate(action.path)}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{action.title}</h3>
                <p className="text-gray-600 leading-relaxed">{action.description}</p>
                <div className="mt-6 flex items-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors">
                  Get started
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="max-w-7xl mx-auto mt-16">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                <FaRocket className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Welcome to DayJobs!</p>
                <p className="text-gray-600 text-sm">You're all set to start finding amazing opportunities</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                <FaCheckCircle className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Profile Complete</p>
                <p className="text-gray-600 text-sm">Your profile is ready to attract great opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
