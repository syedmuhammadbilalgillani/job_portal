// models/ContactInfo.js
import mongoose from "mongoose";


const contactInfoSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
    },

    { timestamps: true }
);


const ContactInfo = mongoose.model("ContactInfo", contactInfoSchema);
export default ContactInfo;
