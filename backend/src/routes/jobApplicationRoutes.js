// routes/jobApplications.js
import express from 'express';

import { verifyToken } from '../middlewares/authMiddleware.js';
import { deleteJobApplicationById, filterAndSortApplications, getJobApplicationsForMyPostedJobs, GetUserAppliedApplications, JobApply, updateJobApplicationStatus } from '../controllers/jobApplicationController.js';

const router = express.Router();

// Apply for a job
router.post('/applyJob', verifyToken, JobApply);
// GetUserAppliedApplications
router.get('/GetUserAppliedApplications', verifyToken, GetUserAppliedApplications);
router.get('/getJobApplicationsForMyPostedJobs', verifyToken, getJobApplicationsForMyPostedJobs);
router.delete('/deleteJobApplicationById/:id', verifyToken, deleteJobApplicationById);
router.put('/updateJobApplicationStatus/:id/status', updateJobApplicationStatus);
router.get('/applications/filter', filterAndSortApplications);



export default router;
