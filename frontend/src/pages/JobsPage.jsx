import { useEffect, useState } from 'react'
import '../App.css'

function JobsPage() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('http://localhost:5000/api/jobs/available-jobs')
        const data = await res.json()
        setJobs(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <div className="card">Loading jobs…</div>

  return (
    <div className="card">
      <h2>Available Jobs</h2>
      {jobs.length === 0 && <p>No jobs available right now.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {jobs.map((j) => (
          <li key={j.id} className="job-item">
            <strong>{j.title}</strong>
            <div className="muted">{j.location} • {j.date}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default JobsPage
