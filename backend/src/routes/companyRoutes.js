import express from 'express';
import { getAllCompanies, getCompanyById } from '../controllers/companyController.js';

const router = express.Router();

router
    .route("/readCompany")
    .get(getAllCompanies);
router
    .route("/readCompany/:id")
    .get(getCompanyById);


export default router;
