import express from "express";
import { createContactAndCompany } from "../controllers/contact&CompanyController.js";
import EditorContent from "../models/contentmodel.js";

const router = express.Router();

// Route to create contact and company
router.post("/create", createContactAndCompany);

router.post('/saveContent', async (req, res) => {
    const { content } = req.body;

    try {
        const newContent = new EditorContent({ content });
        await newContent.save();
        res.status(200).send('Content saved successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});
router.get('/content', async (req, res) => {
    try {
        const id = req.params.id;
        const content = await EditorContent.find();
        res.json(content);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});
export default router;
