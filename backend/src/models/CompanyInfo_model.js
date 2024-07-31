import mongoose from 'mongoose';

const companyInfoSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    companyIndustry: {
        type: String,
        required: true,
        trim: true
    },
    companyWebsite: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    linkedinPage: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    companyLogo: {
        type: String,
        trim: true
    },
    numberOfEmployees: {
        type: Number,
        required: true
    },
    companyDescription: {
        type: String
    },
    companyPostDescription: {
        type: String
    },
    approvalStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

const CompanyInfo = mongoose.model('CompanyInfo', companyInfoSchema);
export default CompanyInfo;
