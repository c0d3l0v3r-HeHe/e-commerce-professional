import multer from "multer";
import fs from "fs";
import path from "path";

// Get absolute path to ./Public/temp
const tempDir = path.join(process.cwd(), "Public", "temp");

// Ensure directory exists
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir);  // ✅ use absolute path
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

export const upload = multer({ storage });