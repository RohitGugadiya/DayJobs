import React, { useState } from "react";

function AvailableJobs() {
  const [jobs, setJobs] = useState([
    { id: 1, title: "Furniture Move", location: "Adelaide CBD", date: "2025-10-10" },
    { id: 2, title: "Office Relocation", location: "Glenelg", date: "2025-10-12" },
    { id: 3, title: "Storage Move", location: "Mawson Lakes", date: "2025-10-18" },
  ]);

  const handleAccept = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
    alert("Job accepted!");
  };

  const handleReject = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
    alert("Job rejected!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-600 p-6 text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>
        {jobs.length > 0 ? (
          <ul className="space-y-3">
            {jobs.map((job) => (
              <li
                key={job.id}
                className="bg-white/20 rounded-xl p-4 flex justify-between items-center hover:bg-white/30 transition"
              >
                <div>
                  <h3 className="font-semibold">{job.title}</h3>
                  <p className="text-gray-200 text-sm">
                    📍 {job.location} | 📅 {job.date}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAccept(job.id)}
                    className="bg-green-500 px-4 py-2 rounded-xl hover:bg-green-600 transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(job.id)}
                    className="bg-red-500 px-4 py-2 rounded-xl hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-300">No available jobs at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default AvailableJobs;
