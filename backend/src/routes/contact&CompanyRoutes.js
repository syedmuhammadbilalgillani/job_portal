import express from "express";
import { createContactAndCompany } from "../controllers/contact&CompanyController.js";


const router = express.Router();

// Route to create contact and company
router.post("/create", createContactAndCompany);



export default router;
