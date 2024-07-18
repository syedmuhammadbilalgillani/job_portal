import ContactInfo from '../models/ContactInfo_model.js';
import CompanyInfo from '../models/CompanyInfo_model.js';

export const createContactAndCompany = async (req, res) => {
    const {
        fullName,
        email,
        password,
        phoneNumber,
        companyName,
        companyIndustry,
        companyWebsite,
        linkedinPage,
        companyLogo,
        numberOfEmployees,
        companyDescription
    } = req.body;

    try {
        // Validate email uniqueness
        const existingContact = await ContactInfo.findOne({ email });
        if (existingContact) {
            return res.status(400).json({ message: "Email already exists." });
        }
        const existingPhone = await ContactInfo.findOne({ phoneNumber });
        if (existingPhone) {
            return res.status(400).json({ message: "Phone Number already exists." });
        }

        // Validate company name uniqueness
        const existingCompanyByName = await CompanyInfo.findOne({ companyName });
        if (existingCompanyByName) {
            return res.status(400).json({ message: "Company with this name already exists." });
        }

        // Validate company website uniqueness
        const existingCompanyByWebsite = await CompanyInfo.findOne({ companyWebsite });
        if (existingCompanyByWebsite) {
            return res.status(400).json({ message: "Company with this website link already exists." });
        }

        // Validate LinkedIn page uniqueness
        const existingCompanyByLinkedIn = await CompanyInfo.findOne({ linkedinPage });
        if (linkedinPage && existingCompanyByLinkedIn) {
            return res.status(400).json({ message: "LinkedIn page already exists." });
        }


        const newCompany = new CompanyInfo({
            companyName,
            companyIndustry,
            companyWebsite,
            linkedinPage,
            companyLogo,
            numberOfEmployees,
            companyDescription
        });

        const savedCompany = await newCompany.save();

        // Create a new contact
        const newContact = new ContactInfo({
            fullName,
            email,
            password,
            phoneNumber,
            company: savedCompany._id
        });

        const savedContact = await newContact.save();

        res.status(201).json({
            message: "Contact and Company created successfully",
            contact: savedContact,
            company: savedCompany
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};