import React from "react";
import { FaUserCircle, FaStar } from "react-icons/fa";

function Profile() {
  const user = {
    name: "Rohit Gugadiya",
    email: "rohitgugadiya@gmail.com",
    rating: 4.8,
    completedJobs: 12,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-600 p-6 text-white">
      <div className="max-w-2xl mx-auto bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-lg flex items-center gap-6">
        <FaUserCircle className="text-6xl" />
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-200">{user.email}</p>
          <div className="flex items-center gap-2 mt-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < Math.round(user.rating) ? "text-yellow-400" : "text-gray-400"}
              />
            ))}
            <span className="text-sm">({user.rating})</span>
          </div>
          <p className="text-sm mt-1 text-gray-300">
            Completed Jobs: <span className="font-medium">{user.completedJobs}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
