import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

export async function uplodFileOnCloud(localFilePath) {
    // Upload an image
    try {
        const uploadResult = await cloudinary.uploader
            .upload(localFilePath, {
                public_id: "shoes",
            })
            .catch((error) => {
                console.log(error);
            });

        console.log(uploadResult);

        // Optimize delivery by resizing and applying auto-format and auto-quality
        const optimizeUrl = cloudinary.url("shoes", {
            fetch_format: "auto",
            quality: "auto",
        });
        console.log(optimizeUrl);
        // Transform the image: auto-crop to square aspect_ratio
        const autoCropUrl = cloudinary.url("shoes", {
            crop: "auto",
            gravity: "auto",
            width: 500,
            height: 500,
        });

        console.log(autoCropUrl);
        fs.unlinkSync(localFilePath); // remove the locally stored temp file :: UPLOAD FAILED
        return uploadResult;
    } catch (error) {
        fs.unlinkSync(localFilePath); // remove the locally stored temp file :: UPLOAD FAILED
        print(`Error While uploading the file : ${error.message}`);
    }
}
