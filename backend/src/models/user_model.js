import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['jobSeeker', 'employer', 'admin'],
        default: 'jobSeeker'
    },
    profilePicture: {
        type: String,
        default: ''
    },
    contactInfoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContactInfo'
    },
    gallery: [
        {
            publicId: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    otp: {
        type: String,
    },
    otpExpiration: {
        type: Date,
    },
}, {
    timestamps: true
});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});
userSchema.methods.updatePassword = async function (password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password for update:', hashedPassword); // Debugging line
        this.password = hashedPassword;
        await this.save();
        console.log('Password updated successfully');
    } catch (error) {
        console.error('Password update failed:', error);
        throw new Error('Password update failed');
    }
};

userSchema.methods.isPasswordCorrect = async function (password) {
    const result = await bcrypt.compare(password, this.password);
    console.log('Password comparison result:', result); // Debugging line
    return result;
};



userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
            role: this.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};
const User = mongoose.model('User', userSchema);

export default User;
