// routes/jobApplications.js
import express from 'express';

import { verifyToken } from '../middlewares/authMiddleware.js';
import { deleteJobApplicationById, GetUserAppliedApplications, JobApply } from '../controllers/jobApplicationController.js';

const router = express.Router();

// Apply for a job
router.post('/applyJob', verifyToken, JobApply);
// GetUserAppliedApplications
router.get('/GetUserAppliedApplications', verifyToken, GetUserAppliedApplications);
router.delete('/deleteJobApplicationById/:id', verifyToken, deleteJobApplicationById);


export default router;
