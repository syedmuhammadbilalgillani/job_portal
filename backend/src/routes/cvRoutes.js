import express from "express";


import { verifyToken } from "../middlewares/authMiddleware.js";
import { checkCVExists, CreateCV, GetCV } from "../controllers/cvController.js";

import Element from "../models/Element_model.js";
import Element_model from "../models/Element_model.js";
import Page from "../models/Element_model.js";

const router = express.Router();
// router
//     .route("createCV")
//     .post(verifyToken, CreateCV);
router.route("/createCV").post(verifyToken, CreateCV);
router.route("/getCV").get(verifyToken, GetCV);
router.route("/checkCVExists").get(verifyToken, checkCVExists);

router.post('/save-page', async (req, res) => {
    try {
        const { elements, htmlCode } = req.body; // Destructure data from request body

        // Create a new page object
        const newPage = new Page({
            elements, // Elements in JSON format
            htmlCode, // Custom HTML code
        });

        // Save the page to the database
        await newPage.save();

        res.status(200).json({ message: 'Page saved successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save page', error });
    }
});


router.get('/get-pages', async (req, res) => {
    try {
        const pages = await Page.find(); // Retrieve all pages from the database
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve pages', error });
    }
})

// Get a single page by ID
router.get('/get-page', async (req, res) => {
    try {
        const _id = '66b9b338aa4c9b9d187e6e01';
        const page = await Page.findById(_id); // Retrieve a specific page by ID

        if (page) {
            res.status(200).json(page);
        } else {
            res.status(404).json({ message: 'Page not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve page', error });
    }
});
router.delete('/delete/:id', async (req, res) => {
    try {
        const _id = req.params.id; // Retrieve the ID from the URL
        const page = await Page.findByIdAndDelete(_id); // Delete the specific page by ID

        if (page) {
            res.status(200).json({ message: 'Page deleted successfully', page });
        } else {
            res.status(404).json({ message: 'Page not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete page', error });
    }
});
router.post('/', async (req, res) => {
    try {
        const elements = req.body;
        await Element_model.deleteMany({}); // Clear existing elements
        await Element_model.insertMany(elements);
        res.send('Elements saved successfully');
    } catch (error) {
        res.status(500).send('Error saving elements');
    }
});

// Load elements
router.get('/', async (req, res) => {
    try {
        const elements = await Element_model.find();
        res.json(elements);
    } catch (error) {
        res.status(500).send('Error loading elements');
    }
});
export default router;
