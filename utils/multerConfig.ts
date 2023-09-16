import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, callback) => {
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    callback(null, uniqueFilename);
  },
});

const upload = multer({ storage });

export default upload;
