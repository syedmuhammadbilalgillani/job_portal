import express from 'express';
import Page from '../models/Page_model.js'; // Import Page model

const router = express.Router();

// Save page data
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

export default router;
