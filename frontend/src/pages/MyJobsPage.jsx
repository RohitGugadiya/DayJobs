import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/JobsPage.css";
import { useAuthStore } from "../store/userAuthStore.js";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MyJobsPage() {
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [myJobs, setMyJobs] = useState([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchMyJobs = async () => {
      if (!user?.id) return;
      try {
        setIsLoading(true);
        const res = await axios.get(
          `http://localhost:5000/api/jobs/my-jobs/${user.id}`
        );
        setMyJobs(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch your jobs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyJobs();
  }, [user]);

  const toggleExpand = (jobId) => {
    setExpandedJobId((prev) => (prev === jobId ? null : jobId));
  };

  return (
    <div className="jobs-page">
      <h2 className="jobs-title">My Accepted Jobs</h2>

      {isLoading ? (
        <div className="loading">Loading your jobs...</div>
      ) : error ? (
        <p className="muted">{error}</p>
      ) : myJobs.length === 0 ? (
        <p className="muted">You don’t have any upcoming work yet.</p>
      ) : (
        <ul className="jobs-list">
          {myJobs.map((job) => (
            <li
              key={job.jobid}
              className={`job-card ${expandedJobId === job.jobid ? "expanded" : ""}`}
              onClick={() => toggleExpand(job.jobid)}
            >
              <div className="job-info">
                <h3>{job.jobtitle}</h3>
                <p className="muted">
                  {job.joblocation} •{" "}
                  {new Date(job.jobdate).toLocaleDateString()}
                </p>
              </div>

              {expandedJobId === job.jobid && (
                <div className="job-details">
                  <p>{job.jobdescription}</p>

                  <div className="map-container">
                    {job.latitude != null && job.longitude != null ? (
                      <div
                        style={{
                          height: "200px",
                          width: "100%",
                          marginTop: "10px",
                          borderRadius: "8px",
                          overflow: "hidden",
                        }}
                      >
                        <MapContainer
                          center={[job.latitude, job.longitude]}
                          zoom={13}
                          scrollWheelZoom={false}
                          style={{ height: "100%", width: "100%" }}
                        >
                          <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          <Marker position={[job.latitude, job.longitude]}>
                            <Popup>{job.jobtitle}</Popup>
                          </Marker>
                        </MapContainer>
                      </div>
                    ) : (
                      <p className="muted">Location not available.</p>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyJobsPage;
