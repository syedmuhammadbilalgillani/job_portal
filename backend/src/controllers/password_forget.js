import User from "../models/user_model.js";
import { validationResult } from "express-validator";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();




function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

export const generateAndSendOTP = async (req, res) => {
    const { email } = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate OTP
        const otp = generateOTP();
        const otpExpiration = new Date();
        otpExpiration.setMinutes(otpExpiration.getMinutes() + 10);

        // Save OTP to user document
        user.otp = otp;
        user.otpExpiration = otpExpiration;
        await user.save();

        // // Check if OTP matches
        // if (user.otp !== otp) {
        //     return res.status(400).json({ message: "Invalid OTP" });
        // }

        // // Clear OTP after verification
        // user.otp = null;
        // await user.save();

        // Create transporter with nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Set up email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset", // Change subject as needed
            text: otp.toString(),
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: "OTP Send successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const verifyOtpForPassword = async (req, res) => {
    const { email, otp } = req.body;
    try {
        // Check if the user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if OTP matches
        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Check if OTP is expired
        if (new Date() > user.otpExpiration) {
            return res.status(400).json({ message: "OTP expired" });
        }

        // Clear OTP after verification
        user.otp = null;
        await user.save();

        // OTP is valid
        res.status(200).json({ message: "OTP verified successfully", otp });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const updatePassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        // Find user by email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update password
        user.password = newPassword; // Assuming there's a password field in your user model
        await user.save();

        // Password updated successfully
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};