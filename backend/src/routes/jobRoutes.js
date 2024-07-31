import express from "express";
import { createJobInExistingCompany, getAllJobs, getJobById, updateJobById } from "../controllers/jobController.js";
import { addRole, verifyToken } from "../middlewares/authMiddleware.js";


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
export default router;
