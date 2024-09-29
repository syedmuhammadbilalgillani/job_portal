import express from 'express';
import { createCompany, deleteCompanyById, getAllCompanies, getAllCompaniesAdmin, getCompanyById, getCompanyByIdForUser, updateCompanyById, updateCompanyByIdForUser } from '../controllers/companyController.js';
import { addRole, verifyToken } from '../middlewares/authMiddleware.js';
import CompanyInfo from '../models/CompanyInfo_model.js';
import Job from '../models/job_model.js';


const router = express.Router();

router
    .route("/readCompany")
    .get(getAllCompanies);
router
    .route("/readCompany/:id")
    .get(getCompanyById);
router
    .route("/readCompanyForUser")
    .get(verifyToken, getCompanyByIdForUser);
router
    .route("/updateCompanyInfo")
    .put(verifyToken, updateCompanyByIdForUser);

router.get('/checkUserCompany', verifyToken, async (req, res) => {
    const userId = req.user._id; // Assuming user is authenticated and req.user contains the logged-in user

    try {
        const company = await CompanyInfo.findOne({ createdBy: userId });
        if (company) {
            res.status(200).json({ exists: true, companyId: company._id });
        } else {
            res.status(200).json({ exists: false });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.get('/checkUserRole', verifyToken, async (req, res) => {
    try {
        const userRole = req.user.role; // Assuming user is authenticated and req.user contains the logged-in user
        res.status(200).json({ role: userRole });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.post('/createCompany', verifyToken, addRole(['jobSeeker', 'admin']), createCompany);
//admin
router
    .route("/getAllCompaniesAdmin")
    .get(verifyToken, addRole(['admin']), getAllCompaniesAdmin);


router
    .route("/updateCompany/:id")
    .put(verifyToken, addRole(['admin']), updateCompanyById);
router
    .route("/deleteCompany/:id")
    .delete(verifyToken, addRole(['jobSeeker', 'admin']), deleteCompanyById);




// router.post('/createJob', verifyToken, addRole(['jobSeeker', 'admin']), async (req, res) => {
//     const { job } = req.body;
//     const userId = req.user._id; // Extract userId from token

//     try {
//         // Check if the user has a company
//         const userCompany = await CompanyInfo.findOne({ createdBy: userId });

//         if (!userCompany) {
//             return res.status(403).json({
//                 message: 'User does not have a company. Create a company first.'
//             });
//         }

//         // Create a new job and link it to the user's company
//         job.companyLogo = userCompany._id; // Link company logo (ID) to the job
//         const newJob = new Job(job);
//         const savedJob = await newJob.save();

//         res.status(201).json({ job: savedJob });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });
router.post('/createJobInExistingCompany', verifyToken, async (req, res) => {
    const { companyId, job } = req.body;
    const userId = req.user._id; // Extract userId from token

    try {
        // Verify if the company exists and is created by the current user
        const existingCompany = await CompanyInfo.findOne({ _id: companyId, createdBy: userId });

        if (!existingCompany) {
            return res.status(403).json({
                message: 'Company does not exist or does not belong to the user.'
            });
        }

        // Create a new job associated with the existing company
        job.companyLogo = companyId; // Assuming companyLogo is being used to store the companyId in the Job model
        const newJob = new Job(job);
        const savedJob = await newJob.save();

        res.status(201).json({ job: savedJob });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
export default router;
