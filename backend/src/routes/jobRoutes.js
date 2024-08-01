import express from "express";
import { createJobInExistingCompany, deleteJobById, getAllJobs, getAllJobsForAdmin, getAuthenticatedUserJobsPost, getJobById, updateJobById } from "../controllers/jobController.js";
import { addRole, verifyToken } from "../middlewares/authMiddleware.js";
import CompanyInfo from "../models/CompanyInfo_model.js";
import Job from "../models/job_model.js";


const router = express.Router();
// router.post('/createJob', verifyToken, addRole(['jobSeeker', 'admin']),

router
    .route("/createJob")
    .post(verifyToken, addRole(['jobSeeker', 'admin']), createJobInExistingCompany);
router
    .route("/readJobs")
    .get(getAllJobs);
router
    .route("/readJob/:id")
    .get(getJobById);
router
    .route("/updateJob/:id")
    .put(verifyToken, addRole(['jobSeeker', 'admin']), updateJobById);
router
    .route("/deleteJobById/:id")
    .delete(verifyToken, addRole(['jobSeeker', 'admin']), deleteJobById);
router.get('/getAuthenticatedUserJobsPost', verifyToken, addRole(["admin", "jobSeeker"]), getAuthenticatedUserJobsPost);
router
    .route("/readJobsAdmin")
    .get(verifyToken, addRole(["admin"]), getAllJobsForAdmin);
export default router;
