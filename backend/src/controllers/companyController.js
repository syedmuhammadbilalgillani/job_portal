import CompanyInfo from '../models/CompanyInfo_model.js';

export const getAllCompanies = async (req, res) => {
    try {
        const companies = await CompanyInfo.find();
        res.json(companies);
    } catch (err) {
        res.status(500).json({ message: err.message });
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