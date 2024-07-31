import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";



dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadOnCloudinary = async (localFilePath, Images) => {
    try {
        if (!localFilePath) return null;

        // Upload the file on Cloudinary with the specified folder
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: Images // Specify the folder name here
        });

        // File has been uploaded successfully
        // console.log("File is uploaded on Cloudinary ", response.url);

        // Delete the locally saved temporary file
        fs.unlinkSync(localFilePath);

        return response;

    } catch (error) {
        // Remove the locally saved temporary file as the upload operation failed
        fs.unlinkSync(localFilePath);
        return null;
    }
};
export const deleteFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
        console.log(`Deleted image with public ID: ${publicId} from Cloudinary`);
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        throw error;
    }
};