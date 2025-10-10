export const availableJobs = async(req, res) => {
    if (availableJobs.length === 0) {
        res.status(404).json({ message: "No available jobs" });
        return;
    }
    res.json(availableJobs);

}

export const acceptJob = async(req, res) => {
    const { jobId, userEmail } = req.body;
    const job = availableJobs.find(j => j.id === jobId);
    if (!job) {
        res.status(404).json({ message: "Job not found" });
        return;
    }
    availableJobs.splice(availableJobs.indexOf(job), 1);
    users.find(u => u.email === userEmail).acceptedJobs.push(job);
    users.splice(users.indexOf(users.find(u => u.email === userEmail)), 1);
    users.push(users.find(u => u.email === userEmail));
    res.json({ message: "Job accepted" });
}