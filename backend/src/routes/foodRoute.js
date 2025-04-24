import express from 'express';
import { addFood ,listFood} from '../controllers/foodController.js';
import multer from 'multer';

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads", // Make sure this folder exists
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });


// Use upload.single to handle image field
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list",listFood)

export default foodRouter;
