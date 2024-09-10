import { v2 as cloudinary } from 'cloudinary'; // Single import statement
import fs from 'fs/promises'; // Use the promises API for async/await compatibility
import path from 'path'; // To handle file paths
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Ensure the file is saved in the public folder
    const fileName = path.basename(localFilePath);
    const publicFilePath = path.join('public', fileName);

    // Move the file to the public folder
    await fs.rename(localFilePath, publicFilePath);

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(publicFilePath, {
      resource_type: 'auto',
    });

    console.log('File is uploaded on Cloudinary', response.url);

    // Unlink (delete) the file from the public folder
    await fs.unlink(publicFilePath);

    return response;
  } catch (error) {
    console.error('Cloudinary upload failed', error);

    // Ensure the file is removed from the local folder in case of failure
    await fs.unlink(localFilePath).catch((err) => {
      console.error('Failed to delete local file', err);
    });

    return null;
  }
};

export default uploadOnCloudinary;
