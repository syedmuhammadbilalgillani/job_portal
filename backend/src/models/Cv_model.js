// models/CV.js
import mongoose from 'mongoose';

const cvSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    personalInfo: {
        name: String,
        email: String,
        phone: String,
        address: String,
        linkedin: String,
        github: String
    },
    education: [{
        institution: String,
        degree: String,
        fieldOfStudy: String,
        startYear: Number,
        endYear: Number
    }],
    experience: [{
        company: String,
        position: String,
        startDate: Date,
        endDate: Date,
        responsibilities: String
    }],
    skills: [String],
    projects: [{
        title: String,
        description: String,
        link: String
    }],
    certifications: [{
        title: String,
        institution: String,
        date: Date
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const CV = mongoose.model('CV', cvSchema);
export default CV;
