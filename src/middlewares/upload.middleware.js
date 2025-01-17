import fs from "fs";
import multer from "multer";

// Ensure the directory exists
const TEMP_DIR = "public/temp";
if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Multer Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, TEMP_DIR);
    },
    filename: function (req, file, cb) {
        cb(null, `${Math.floor(Math.random() * 9999)}_${file.originalname}`);
    },
});

export const upload = multer({ storage });
