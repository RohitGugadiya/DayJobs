import React, { useState, useEffect } from "react";
import { FaUserCircle, FaStar, FaBriefcase } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

function Profile() {
  const { user } = useAuth();
  const [userJobs, setUserJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserJobs();
    }
  }, [user]);

  const fetchUserJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/api/user-jobs/${encodeURIComponent(user.email)}`);
      const data = await res.json();
      
      if (res.ok) {
        setUserJobs(data);
      }
    } catch (err) {
      console.error("Failed to fetch user jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate rating based on completed jobs (mock calculation)
  const rating = userJobs.length > 0 ? Math.min(5, 3.5 + (userJobs.length * 0.2)) : 3.5;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-xl border border-white/20">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xl font-semibold text-gray-700">Loading profile...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
                <span className="text-4xl font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                {user.name}
              </h1>
              <p className="text-gray-600 text-lg mb-4">{user.email}</p>
              
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < Math.round(rating) ? "text-yellow-400 w-5 h-5" : "text-gray-300 w-5 h-5"}
                  />
                ))}
                <span className="text-gray-700 font-semibold ml-2">({rating.toFixed(1)})</span>
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-2xl">
                  <span className="text-purple-700 font-semibold">{userJobs.length} Jobs Accepted</span>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-2 rounded-2xl">
                  <span className="text-blue-700 font-semibold">Member since 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20 text-center hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaBriefcase className="text-white text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Jobs</h3>
            <p className="text-3xl font-bold text-gray-800">{userJobs.length}</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20 text-center hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaStar className="text-white text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Rating</h3>
            <p className="text-3xl font-bold text-gray-800">{rating.toFixed(1)}</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20 text-center hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaUserCircle className="text-white text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Member Since</h3>
            <p className="text-3xl font-bold text-gray-800">2024</p>
          </div>
        </div>

        {/* Recent Jobs */}
        {userJobs.length > 0 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Accepted Jobs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userJobs.slice(0, 6).map((job) => (
                <div key={job.id} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                      </svg>
                    </div>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                      Accepted
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">{job.title}</h4>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600 flex items-center">
                      <svg className="w-3 h-3 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {job.location}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <svg className="w-3 h-3 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {job.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {userJobs.length === 0 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-xl border border-white/20 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <FaBriefcase className="w-10 h-10 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No jobs yet</h3>
            <p className="text-gray-600 mb-6">Start accepting jobs to build your profile and track your progress!</p>
            <button 
              onClick={() => window.location.href = '/available-jobs'}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Browse Available Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
