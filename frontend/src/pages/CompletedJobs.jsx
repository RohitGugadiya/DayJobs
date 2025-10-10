import React from "react";

function CompletedJobs() {
  const completedJobs = [
    { id: 1, title: "Small Apartment Move", location: "Norwood", date: "2025-09-20" },
    { id: 2, title: "Warehouse Shift", location: "Port Adelaide", date: "2025-09-25" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-600 p-6 text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold mb-4">Completed Jobs</h2>
        {completedJobs.length > 0 ? (
          <ul className="space-y-3">
            {completedJobs.map((job) => (
              <li
                key={job.id}
                className="bg-white/20 rounded-xl p-4 hover:bg-white/30 transition"
              >
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-gray-200 text-sm">
                  📍 {job.location} | 📅 {job.date}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-300">No completed jobs yet.</p>
        )}
      </div>
    </div>
  );
}

export default CompletedJobs;
