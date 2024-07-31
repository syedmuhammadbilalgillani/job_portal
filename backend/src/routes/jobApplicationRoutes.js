// routes/jobApplications.js
import express from 'express';

import { verifyToken } from '../middlewares/authMiddleware.js';
import { GetUserAppliedApplications, JobApply } from '../controllers/jobApplicationController.js';

const router = express.Router();

// Apply for a job
router.post('/applyJob', verifyToken, JobApply);
// GetUserAppliedApplications
router.get('/GetUserAppliedApplications', verifyToken, GetUserAppliedApplications);


export default router;
