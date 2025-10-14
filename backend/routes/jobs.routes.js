 import express from "express";
 const router = express.Router();
import pool from "../config/db.js";

router.get("/available-jobs", async(req, res) => {
   
    try {
    const availableJobs= await pool.query("SELECT * FROM jobs");
    if (availableJobs.rows.length === 0) {
        return res.status(404).json({ message: "No available jobs" });
    }
    console.log(availableJobs.rows);
    res.json(availableJobs.rows);
    } catch (error) {
        console.error("Error fetching available jobs:", error);
        res.status(500).json({ message: "Server error" });
    }   
});

router.post("/accept-job", async (req, res) => {
  const { id, jobId } = req.body;

  if (!id || !jobId) {
    return res.status(400).json({ message: "User ID and Job ID are required" });
  }

  try {
    const jobResult = await pool.query("SELECT * FROM jobs WHERE id = $1", [jobId]);

    if (jobResult.rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    const { title, description, job_date, location } = jobResult.rows[0];

    await pool.query(
      "INSERT INTO joblist (userId, jobId, jobtitle, jobdescription, jobdate, joblocation) VALUES ($1, $2, $3, $4, $5, $6)",
      [id, jobId, title, description, job_date, location]
    );

    await pool.query("DELETE FROM jobs WHERE id = $1", [jobId]);

    res.json({ message: "Job accepted successfully" });
  } catch (error) {
    console.error("Error accepting job:", error);
    res.status(500).json({ message: "Server error while accepting job" });
  }
});

router.get("/my-jobs/:userId", async(req, res) => {
    const userId = parseInt(req.params.userId);
    console.log(userId);
    const jobs = await pool.query("SELECT * FROM joblist WHERE userid = $1", [userId]);
        console.log(jobs);
        if (jobs.rows.length === 0) {
            return res.status(404).json({ message: "You dont have any upcoming work" });
        }
    res.json(jobs.rows);
});

export default router;