import type { Request } from "express";
import multer from "multer";
import path from "path";

const storage: multer.StorageEngine = multer.diskStorage({
    destination: path.join(__dirname, "../uploads"),
    filename: (req: Request, file, cb) => {
        const uniqueName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

export default upload