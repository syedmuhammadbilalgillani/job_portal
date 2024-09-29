import mongoose from 'mongoose';

const { Schema } = mongoose;

const jobSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    jobCategory: {
        type: String,
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    jobPostDescription: {
        type: String,
        required: true,
    },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
    },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
        required: true,
    },
    requirements: [{
        type: String,
    }],
    responsibilities: [{
        type: String,
    }],
    postedDate: {
        type: Date,
        default: Date.now,
    },
    lastDateToApply: {
        type: Date,
        // required: true,
    },
    contactEmail: {
        type: String,
        // required: true,
    },
    approvalStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
