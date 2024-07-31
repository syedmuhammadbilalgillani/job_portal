import Job from "../models/job_model.js";
import JobApplication from "../models/JobApplication_model.js";

export const JobApply = async (req, res) => {
    const { jobId } = req.body;
    const userId = req.user._id; // Assuming you have user info in req.user from authentication middleware

    try {
        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        // Check if the user has already applied
        const existingApplication = await JobApplication.findOne({ job: jobId, applicant: userId });
        if (existingApplication) return res.status(400).json({ message: 'You have already applied for this job' });

        // Create a new application
        const application = new JobApplication({
            job: jobId,
            applicant: userId
        });

        await application.save();
        res.status(201).json({ message: 'Application submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};
export const GetUserAppliedApplications = async (req, res) => {
    const userId = req.user._id; // Assuming you have user info in req.user from authentication middleware

    try {
        const applications = await JobApplication.find({ applicant: userId }).populate('job');
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};