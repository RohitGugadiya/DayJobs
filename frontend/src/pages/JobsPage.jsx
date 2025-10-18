import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useAuthStore } from "../store/userAuthStore.js";
import "../CSS/JobsPage.css";

function JobsPage() {
  const [expandedJobId, setExpandedJobId] = useState(null);
  const { loadJobs, jobs, isLoading, handleJobAction, user, rejectJobAction} = useAuthStore();

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const toggleExpand = (jobId) => {
    setExpandedJobId(prev => (prev === jobId ? null : jobId));
  };

  const handleAction = (jobId, userId) => {
    handleJobAction(jobId, userId);
  };

    const rejectAction = (jobId, userId) => {
    rejectJobAction(jobId, userId);
  };
  

  return (
    <div className="jobs-page">
      <h2 className="jobs-title">Available Jobs</h2>

      {isLoading ? (
        <div className="loading">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <p className="muted">No jobs available right now.</p>
      ) : (
        <ul className="jobs-list">
          {jobs.map(job => (
            <li
              key={job.id}
              className={`job-card ${expandedJobId === job.id ? "expanded" : ""}`}
            >
              <div
                className="job-info"
                onClick={() => toggleExpand(job.id)}
              >
                <h3>{job.title}</h3>
                <p className="muted">
                  {job.location} • {new Date(job.date || Date.now()).toLocaleTimeString()}
                </p>
              </div>

              {expandedJobId === job.id && (
                <div className="job-details">
                  <p>{job.description}</p>
                  <p><strong>Contact:</strong> {job.contact || "N/A"}</p>

                  {job.latitude && job.longitude ? (
                    <div style={{ height: "300px", width: "100%", marginTop: "10px" }}>
                      <MapContainer
                        center={[job.latitude, job.longitude]}
                        zoom={13}
                        scrollWheelZoom={false}
                        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[job.latitude, job.longitude]}>
                          <Popup>{job.title}</Popup>
                        </Marker>
                      </MapContainer>
                    </div>
                  ) : (
                    <p className="muted">Location not available.</p>
                  )}
                </div>
              )}

              <div className="job-actions">
                <button
                  className="accept-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(job.id, user.id);
                  }}
                >
                  Accept
                </button>
                <button
                  className="reject-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    rejectAction(job.id);
                  }}
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
