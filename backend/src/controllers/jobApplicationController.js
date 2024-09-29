import Job from "../models/job_model.js";
import CompanyInfo from "../models/CompanyInfo_model.js";
import JobApplication from "../models/JobApplication_model.js";
import CV from "../models/Cv_model.js";

export const JobApply = async (req, res) => {
    const { jobId } = req.body;
    const userId = req.user._id;

    try {
        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: "Job not found" });

        // Check if the user has already applied
        const existingApplication = await JobApplication.findOne({
            job: jobId,
            applicant: userId,
        });
        if (existingApplication)
            return res
                .status(400)
                .json({ message: "You have already applied for this job" });

        // Check if the CV exists
        let cv = await CV.findOne({ userId });
        if (!cv) {
            // If CV doesn't exist, create a new CV
            return res.status(400).json({
                message: "Please upload your CV first.",
            });
        }

        // Create a new job application
        const application = new JobApplication({
            job: jobId,
            applicant: userId,
            cv: cv._id, // Link the CV to the job application
        });

        await application.save();
        res.status(201).json({ message: "Application submitted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const GetUserAppliedApplications = async (req, res) => {
    const userId = req.user._id; // Assuming you have user info in req.user from authentication middleware

    try {
        const applications = await JobApplication.find({
            applicant: userId,
        }).populate("job");
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const deleteJobApplicationById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await JobApplication.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Job Application not found" });
        }

        res.status(200).json({ message: "Job Application deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting job", error });
    }
};

export const getJobApplicationsForMyPostedJobs = async (req, res) => {
    try {
        const userId = req.user._id; // Authenticated user ka ID
        const company = await CompanyInfo.findOne({ createdBy: userId });

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        const companyId = company._id;

        const applications = await JobApplication.find()
            .populate({
                path: 'job',
                match: { companyId: companyId },
                populate: {
                    path: 'companyId',
                    model: 'CompanyInfo',
                    select: 'companyName companyIndustry'
                }
            })
            .populate('applicant', 'name email')
            .populate('cv')
            .exec();

        const filteredApplications = applications.filter(application => application.job !== null);

        return res.status(200).json(filteredApplications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const updateJobApplicationStatus = async (req, res) => {
    const { id } = req.params; // Get the job application ID from the request parameters
    const { status } = req.body; // Get the new status from the request body

    // Validating status
    const validStatuses = [
        "Applied",
        "Reviewed",
        "Interview Scheduled",
        "Offer Extended",
        "Rejected",
    ];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
    }

    try {
        // Find the job application by ID and update the status
        const jobApplication = await JobApplication.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!jobApplication) {
            return res.status(404).json({ error: "Job Application not found" });
        }

        res.json({
            message: "Job Application status updated successfully",
            jobApplication,
        });
    } catch (error) {
        console.error("Error updating job application status:", error);
        res.status(500).json({ error: "Server error" });
    }
};

export const filterAndSortApplications = async (req, res) => {
    const { status, sortBy } = req.query; // Get the status and sort parameters from query

    try {
        // Build the query filter
        const filter = {};
        if (status) {
            filter.status = status;
        }

        // Build the sort options
        const sortOptions = {};
        if (sortBy === "name") {
            sortOptions["applicant.name"] = 1; // Sort by name in ascending order
        } else if (sortBy === "email") {
            sortOptions["applicant.email"] = 1; // Sort by email in ascending order
        }

        const jobApplications = await JobApplication.find(filter)
            .populate("job", "title location")
            .populate("applicant", "name email profilePicture")
            .sort(sortOptions);

        res.status(200).json(jobApplications);
    } catch (error) {
        console.error("Error filtering and sorting job applications:", error);
        res.status(500).json({ message: "Server error" });
    }
};
