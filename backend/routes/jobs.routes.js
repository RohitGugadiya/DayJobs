 import express from "express";
 import { availableJobs, acceptJob } from "../controllers/jobs.controllers";
 const router = express.Router();

router.get("/available-jobs", availableJobs);
router.post("/accept-job", acceptJob);

export default router;  