import User from "../models/user_model.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from 'cloudinary';


export const uploadImage = async (req, res) => {
    const userId = req.user._id;
    const files = req.files;

    if (!files || files.length === 0) {
        return res.status(400).json({ error: "Images are missing" });
    }

    try {
        const uploadPromises = files.map(file => uploadOnCloudinary(file.path, 'user_gallery'));

        const responses = await Promise.all(uploadPromises);

        const user = await User.findById(userId);

        responses.forEach(response => {
            if (response) {
                user.gallery.push({ publicId: response.public_id, url: response.secure_url });
            }
        });

        await user.save();

        const uploadedImages = responses.map(response => response.secure_url);

        res.status(200).json({ message: 'Images uploaded successfully', images: uploadedImages });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading images', error: error.message });
    }
};

export const getImages = async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId).select('gallery');
        res.status(200).json({ gallery: user.gallery });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching images', error });
    }
};

export const deleteImages = async (req, res) => {
    const userId = req.user._id;
    const publicIds = req.body.publicIds; // Array of public IDs

    if (!Array.isArray(publicIds) || publicIds.length === 0) {
        return res.status(400).json({ message: 'Invalid request. No images provided for deletion.' });
    }

    try {
        // console.log(`Attempting to delete images with public IDs: ${publicIds} for user: ${userId}`);

        // Delete images from Cloudinary
        const deletePromises = publicIds.map(publicId => deleteFromCloudinary(`user_gallery/${publicId}`));
        await Promise.all(deletePromises);

        // Remove images from the user's gallery
        const user = await User.findById(userId);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        // console.log(`User's current gallery: ${user.gallery.map(image => image.publicId)}`);

        const initialGallerySize = user.gallery.length;
        user.gallery = user.gallery.filter(image => !publicIds.includes(image.publicId.replace('user_gallery/', '')));

        if (initialGallerySize === user.gallery.length) {
            // console.log('None of the images were found in user gallery');
            return res.status(404).json({ message: 'Images not found in user gallery' });
        }

        await user.save();
        // console.log('Images deleted successfully from user gallery');

        res.status(200).json({ message: 'Images deleted successfully' });
    } catch (error) {
        // console.error('Error deleting images:', error);
        res.status(500).json({ message: 'Error deleting images', message: error.message });
    }
};

export const deleteAllImages = async (req, res) => {
    const userId = req.user._id;

    try {
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract all public IDs from the user's gallery
        const publicIds = user.gallery.map(image => image.publicId);

        // Delete all images from Cloudinary
        if (publicIds.length > 0) {
            const deletePromises = publicIds.map(publicId => cloudinary.uploader.destroy(publicId));
            await Promise.all(deletePromises);
        }

        // Clear the user's gallery
        user.gallery = [];
        await user.save();

        res.status(200).json({ message: 'All images deleted successfully' });
    } catch (error) {
        console.error('Error deleting all images:', error);
        res.status(500).json({ message: 'Error deleting all images', error });
    }
};