import CV from "../models/Cv_model.js";

export const CreateCV = async (req, res) => {
    const { personalInfo, education, experience, skills, projects, certifications } = req.body;
    const userId = req.user._id;

    try {
        // Check if a CV already exists for the user
        const existingCV = await CV.findOne({ userId });
        if (existingCV) {
            return res.status(400).json({ error: 'CV already exists for this user' });
        }

        // Create and save the new CV
        const newCV = new CV({
            userId,
            personalInfo,
            education,
            experience,
            skills,
            projects,
            certifications
        });
        const savedCV = await newCV.save();
        res.status(201).json({ savedCV, message: 'CV saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create CV' });
    }
};
export const GetCV = async (req, res) => {
    const userId = req.user._id;
    try {
        const cv = await CV.findOne({ userId });
        if (!cv) return res.status(404).json({ error: 'CV not found' });
        res.json(cv);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch CV', message: error.message });
    }
};
export const checkCVExists = async (req, res) => {
    const userId = req.user._id;

    try {
        // Check if a CV exists for the user
        const existingCV = await CV.findOne({ userId });
        if (existingCV) {
            return res.status(200).json({ exists: true, message: 'CV exists for this user.' });
        } else {
            return res.status(200).json({ exists: false, message: 'No CV found for this user.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to check CV existence' });
    }
};