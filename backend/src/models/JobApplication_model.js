// models/JobApplication.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const jobApplicationSchema = new Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applicationDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Applied', 'Reviewed', 'Interview Scheduled', 'Offer Extended', 'Rejected'],
        default: 'Applied'
    }
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

export default JobApplication;
