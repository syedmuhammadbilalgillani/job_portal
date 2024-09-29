import CompanyInfo from '../models/CompanyInfo_model.js';
import Job from '../models/job_model.js';











// export const createCompanyAndJob = async (req, res) => {
export const createCompany = async (req, res) => {
    const { company } = req.body;
    const userId = req.user._id; // Extract userId from token

    try {
        // Validate company name
        const existingCompany = await CompanyInfo.findOne({ companyName: company.companyName, createdBy: userId });

        if (existingCompany) {
            return res.status(403).json({
                message: 'Company with this name already exists for the user.'
            });
        }

        // Check if the user already has a company
        const userCompany = await CompanyInfo.findOne({ createdBy: userId });

        if (userCompany) {
            return res.status(403).json({
                message: 'User already has a company and cannot create another one.'
            });
        }

        // Create a new company with approval status set to 'pending'
        const newCompany = new CompanyInfo({ ...company, createdBy: userId, approvalStatus: 'pending' });
        const savedCompany = await newCompany.save();

        // // Create a new job with approval status set to 'pending'
        // job.companyLogo = savedCompany._id;
        // const newJob = new Job({ ...job, approvalStatus: 'pending' });
        // const savedJob = await newJob.save();

        res.status(201).json({ company: savedCompany, message: "Company Created Successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const getAllCompanies = async (req, res) => {
    try {
        const companies = await CompanyInfo.find({ approvalStatus: 'approved' });
        res.json(companies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const getAllCompaniesAdmin = async (req, res) => {
    try {
        const companies = await CompanyInfo.find();
        res.json(companies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const updateCompanyInfo = async (req, res) => {
    const { companyId } = req.params; // Get company ID from request parameters
    const updateData = req.body; // Get updated data from request body

    try {
        // Find the company by ID
        const company = await CompanyInfo.findById(companyId);

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Update company information with the new data
        Object.assign(company, updateData);

        // Save the updated company information
        const updatedCompany = await company.save();

        // Send the updated company data as response
        res.status(200).json(updatedCompany);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a company by ID
export const getCompanyById = async (req, res) => {
    const { id } = req.params;
    try {
        const company = await CompanyInfo.findById(id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.json(company);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const getCompanyByIdForUser = async (req, res) => {
    const userId = req.user._id;

    try {
        const company = await CompanyInfo.findOne({ createdBy: userId });

        if (!company) {
            return res.status(201).json({ message: 'Company not found' });
        }

        res.status(200).json(company);
    } catch (error) {
        console.error('Error fetching company:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
export const updateCompanyByIdForUser = async (req, res) => {
    const userId = req.user._id;
    const { companyData } = req.body;

    try {
        const company = await CompanyInfo.findOne({ createdBy: userId });

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        Object.assign(company, companyData);

        const updatedCompany = await company.save();

        res.status(200).json({ message: 'Company updated successfully', updatedCompany });
    } catch (error) {
        console.error('Error updating company:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const updateCompanyById = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const company = await CompanyInfo.findByIdAndUpdate(id, updatedData, { new: true });
        if (!company) {
            return res.status(404).json({ message: 'CompanyInfo not found' });
        }
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: 'Error updating CompanyInfo', error });
    }
};
export const deleteCompanyById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await CompanyInfo.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Company not found' });
        }

        res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting CompanyInfo', error });
    }
};