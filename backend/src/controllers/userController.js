import { upload } from "../middlewares/multer_middleware.js";
import ContactInfo from "../models/ContactInfo_model.js";
import User from "../models/user_model.js";
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js'
import path from 'path';








export const jobSeekerRegistration = async (req, res) => {
    const { name, email, password, phoneNumber, address, city, state } = req.body;

    try {
        const existingContact = await User.findOne({ email });
        if (existingContact) {
            return res.status(400).json({ message: "Email already exists." });
        }

        const existingPhone = await ContactInfo.findOne({ phoneNumber });
        if (existingPhone) {
            return res.status(400).json({ message: "Phone Number already exists." });
        }

        const contactInfo = new ContactInfo({
            phoneNumber,
            address,
            city,
            state
        });
        await contactInfo.save();

        const newUser = new User({
            name,
            email,
            password,
            role: 'jobSeeker',
            contactInfoId: contactInfo._id
        });

        await newUser.save();

        // Update the contactInfo with the userId
        contactInfo.userId = newUser._id;
        await contactInfo.save();

        const token = newUser.generateAccessToken();

        res
            .cookie("token", token, {
                httpOnly: true,
                secure: true, // Use secure flag in production
                sameSite: 'Strict'
            })
            .status(200)
            .json({ token, user: newUser, message: 'Jobseeker registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const employerRegistration = async (req, res) => {
    const { name, email, password, phoneNumber, address, city, state } = req.body;

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists." });
        }

        // Check if phone number already exists
        const existingPhone = await ContactInfo.findOne({ phoneNumber });
        if (existingPhone) {
            return res.status(400).json({ message: "Phone Number already exists." });
        }

        // Create new contact info
        const contactInfo = new ContactInfo({
            phoneNumber,
            address,
            city,
            state
        });
        await contactInfo.save();

        // Create new user
        const newUser = new User({
            name,
            email,
            password,
            role: 'employer',
            contactInfoId: contactInfo._id
        });
        await newUser.save();

        // Update contact info with userId
        contactInfo.userId = newUser._id;
        await contactInfo.save();

        // Generate token
        const token = newUser.generateAccessToken();

        res
            .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure flag in production
                sameSite: 'Strict'
            })
            .status(201)
            .json({ token, user: newUser, message: 'Employer registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        // console.log('User found:', user);
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Validate the password
        const isPasswordValid = await user.isPasswordCorrect(password);
        // console.log('Password valid:', isPasswordValid);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password.' });
        }

        // Generate the access token with the user's role
        const token = user.generateAccessToken();
        // console.log('Token generated:', token);

        // Send the response with the token
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });
        // console.log('Cookie set with token.');

        res.status(200).json({ token, user, message: 'Login successful' });
        // console.log('Login response sent.');
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'An error occurred during login.' });
    }
};

export const logout = (_, res) => {
    try {
        // Clear the token cookie
        res
            .clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict'
            })
            .status(200)
            .json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getProfileById = async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getProfileContactById = async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const contactInfo = await ContactInfo.findOne({ userId });
        if (!contactInfo) {
            return res.status(404).json({ message: "Contact info not found" });
        }

        res.status(200).json(contactInfo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProfilePicture = async (req, res) => {
    const userId = req.user._id;
    const { profilePictureUrl } = req.body;

    if (!profilePictureUrl) {
        console.log("Profile picture URL is missing in the request body.");
        return res.status(400).json({ message: "Profile picture URL is required" });
    }

    try {
        console.log("User ID from token:", userId);
        const user = await User.findById(userId);

        if (!user) {
            console.log("User not found with ID:", userId);
            return res.status(404).json({ message: "User not found" });
        }

        console.log("Updating user profile picture to:", profilePictureUrl);
        user.profilePicture = profilePictureUrl;
        await user.save();

        console.log("Profile picture updated successfully.");
        return res.status(200).json({ message: "Profile picture updated successfully", user });
    } catch (error) {
        console.error("An error occurred while updating the profile picture:", error);
        return res.status(500).json({ message: "An error occurred while updating the profile picture", error });
    }
};


export const updateUser = async (req, res) => {
    const userId = req.user._id;
    const { contactInfo, password, ...updateData } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the password is being updated
        if (password) {
            user.password = password; // Update the password
        }

        // Update User data
        Object.assign(user, updateData);
        await user.save(); // Save the updated user document

        // Update ContactInfo data if provided
        if (contactInfo) {
            const updatedContactInfo = await ContactInfo.findOneAndUpdate(
                { userId },
                { $set: contactInfo },
                { new: true, runValidators: true }
            );

            if (!updatedContactInfo) {
                return res.status(404).json({ error: 'Contact info not found' });
            }

            user.contactInfo = updatedContactInfo;
        }

        res.status(200).json({ user, message: "Profile updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the user' });
    }
};


export const updateUserPassword = async (req, res) => {
    const { newPassword } = req.body;

    try {
        // Get user from request (set by authMiddleware)
        const user = req.user;

        // Update password
        user.password = newPassword; // فرض کریں آپ کے یوزر ماڈل میں password فیلڈ ہے
        await user.save();

        // Password updated successfully
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const uploadProfilePicture = upload.single('profilePicture');

export const addProfilePicture = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming you have a middleware to get the authenticated user
        // console.log(`User ID: ${userId}`);

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if a file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const localFilePath = req.file?.path; // Corrected this line
        const folderName = 'profilePictures'; // Folder name in Cloudinary
        // console.log(`Local File Path: ${localFilePath}`);

        // Upload new profile picture to Cloudinary
        const uploadResponse = await uploadOnCloudinary(localFilePath, folderName);

        if (!uploadResponse) {
            return res.status(500).json({ message: 'Failed to upload image to Cloudinary' });
        }
        // console.log(`Cloudinary Upload Response: ${uploadResponse.secure_url}`);

        // Delete the previous profile picture from Cloudinary
        if (user.profilePicture) {
            const publicId = path.basename(user.profilePicture, path.extname(user.profilePicture)); // Extract the publicId from the URL
            await deleteFromCloudinary(`profilePictures/${publicId}`);
        }

        // Update user's profile picture URL
        user.profilePicture = uploadResponse.secure_url;
        await user.save();

        return res.status(200).json({ message: 'Profile picture updated successfully', profilePicture: user.profilePicture });
    } catch (error) {
        console.error('Error updating profile picture:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};



// admin
export const getAllUsers = async (req, res) => {
    try {
        // Fetch all users
        const users = await User.find().exec();

        // Extract userIds from the users
        const userIds = users.map(user => user._id);

        // Fetch contact information based on userIds
        const contactInfos = await ContactInfo.find({ userId: { $in: userIds } }).exec();

        // Combine user and contact info
        const usersWithContactInfo = users.map(user => {
            // Find the contact info for the current user
            const contactInfo = contactInfos.find(info => info.userId.toString() === user._id.toString());

            return {
                ...user.toObject(),
                contactInfo: contactInfo || null // Add contact info if available
            };
        });

        res.json(usersWithContactInfo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export async function deleteUser(req, res) {
    try {
        const { userId } = req.params;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // // Delete images associated with the user's avatar
        // if (user.avatar) {
        //     try {
        //         // Construct the file path
        //         const filePath = path.resolve(user.avatar);

        //         // Check if the file exists
        //         if (fs.existsSync(filePath)) {
        //             // Delete the file
        //             await fs.promises.unlink(filePath);
        //         } else {
        //             console.log("Avatar file not found:", filePath);
        //         }
        //     } catch (error) {
        //         console.error("Error deleting image:", error);
        //     }
        // }

        // Delete the user
        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: `User deleted successfully` });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}

// const { name, email, password, phoneNumber, address, city, state } = req.body;
// try {
//     const existingContact = await User.findOne({ email });
//     if (existingContact) {
//         return res.status(400).json({ message: "Email already exists." });
//     }
//     const existingPhone = await ContactInfo.findOne({ phoneNumber });
//     if (existingPhone) {
//         return res.status(400).json({ message: "Phone Number already exists." });
//     }
//     // Create contact info
//     const contactInfo = new ContactInfo({
//         phoneNumber,
//         address,
//         city,
//         state,
//     });
//     const savedContactInfo = await contactInfo.save();

//     // Create user
//     const user = new User({
//         name,
//         email,
//         password,
//         role: 'jobSeeker',
//         contactInfoId: savedContactInfo._id,
//     });
//     await user.save();

//     res.status(201).json({
//         message: 'Jobseeker registered successfully',
//         user,
//     });