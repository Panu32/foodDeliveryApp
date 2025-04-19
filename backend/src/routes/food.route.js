import { Router } from "express"; // ✅ import Router from express
import { upload } from "../middlewares/multer.middleware.js";
import { addFoodItem } from "../controllers/food.controller.js";

const router = Router();

router.post(
  "/additem",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  addFoodItem
);

export default router;
