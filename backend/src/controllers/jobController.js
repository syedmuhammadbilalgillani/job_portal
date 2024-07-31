import CompanyInfo from "../models/CompanyInfo_model.js";
import Job from "../models/job_model.js";




// router.post('/createJob', verifyToken, addRole(['jobSeeker', 'admin']),

export const createJobInExistingCompany = async (req, res) => {
    const { job } = req.body;
    const userId = req.user._id; // Extract userId from token

    try {
        // Check if the user has a company
        const userCompany = await CompanyInfo.findOne({ createdBy: userId });

        if (!userCompany) {
            return res.status(403).json({
                message: 'User does not have a company. Create a company first.'
            });
        }

        // Check if the company is approved
        if (userCompany.approvalStatus !== 'approved') {
            return res.status(403).json({
                message: 'User\'s company is not approved. Only approved companies can create jobs.'
            });
        }

        // Create a new job and link it to the user's company with approval status set to 'pending'
        job.companyLogo = userCompany._id; // Link company logo (ID) to the job
        const newJob = new Job({ ...job, approvalStatus: 'pending' });
        const savedJob = await newJob.save();

        res.status(201).json({ job: savedJob });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ approvalStatus: 'approved' }); // Populate company information if needed
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const updateJobById = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const job = await Job.findByIdAndUpdate(id, updatedData, { new: true });
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Error updating job', error });
    }
};
export const getJobById = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ message: 'job not found' });
        }
        res.json(job);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};