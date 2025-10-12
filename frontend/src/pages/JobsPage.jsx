import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/JobsPage.css"; // make sure to create this CSS file

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs/available-jobs");
        setJobs(res.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  const handleAction = async (jobId, action) => {
    try {
      // Example API endpoints:
      // POST /api/jobs/:id/accept or /api/jobs/:id/reject
      await axios.post(`http://localhost:5000/api/jobs/${jobId}/${action}`);

      // Remove job from list after action
      setJobs((prev) => prev.filter((job) => job.id !== jobId));

      setActionMessage(`You ${action === "accept" ? "accepted" : "rejected"} the job.`);
      setTimeout(() => setActionMessage(""), 3000);
    } catch (error) {
      console.error(`Error while trying to ${action} job:`, error);
    }
  };

  if (loading) return <div className="loading">Loading jobs...</div>;

  return (
    <div className="jobs-page">
      <h2 className="jobs-title">Available Jobs</h2>

      {actionMessage && <div className="message">{actionMessage}</div>}

      {jobs.length === 0 ? (
        <p className="muted">No jobs available right now.</p>
      ) : (
        <ul className="jobs-list">
          {jobs.map((job) => (
            <li key={job.id} className="job-card">
              <div className="job-info">
                <h3>{job.title}</h3>
                <p className="muted">
                  {job.location} • Posted at{" "}
                  {new Date(job.date || Date.now()).toLocaleTimeString()}
                </p>
              </div>
              <div className="job-actions">
                <button
                  className="accept-btn"
                  onClick={() => handleAction(job.id, "accept")}
                >
                  Accept
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleAction(job.id, "reject")}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default JobsPage;
