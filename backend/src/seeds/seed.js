import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user_model.js';
import connectDB from '../db/db.js';
import { app } from '../app.js';
import ContactInfo from '../models/ContactInfo_model.js';

dotenv.config();
const PORT = process.env.PORT || 4000;
const HOST = '0.0.0.0';
connectDB()
    .then(() => {
        app.listen(PORT, HOST, () => {
            console.log(`Server is running on http://${HOST}:${PORT}`);
        });
    })
    .catch((err) => {
        console.log(`DB Connection Failed`, err);
    });


const seedAdminUser = async () => {
    try {
        // Create admin user
        const adminUser = new User({
            name: 'Syed Muhammad Bilal Gillani',
            email: 'bettertalent3@gmail.com',
            password: 'bilal123', // Already hashed
            role: 'admin',
            profilePicture: '',
            gallery: [], // Empty array
        });

        await adminUser.save();

        // Create contact info with reference to the admin user
        const contactInfo = new ContactInfo({
            phoneNumber: '123-456-7890',
            address: '123 Main St',
            city: 'Cityville',
            state: 'State',
            userId: adminUser._id // Set the reference to the created user
        });

        await contactInfo.save();

        // Update admin user with the contact info reference
        adminUser.contactInfoId = contactInfo._id; // Set the reference to the created contact info
        await adminUser.save();

        console.log('Admin user and contact info created successfully');
    } catch (error) {
        console.error('Error creating admin user and contact info:', error);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
};


// Run the seed script
const runSeed = async () => {
    await connectDB();
    await seedAdminUser();
};

runSeed();
