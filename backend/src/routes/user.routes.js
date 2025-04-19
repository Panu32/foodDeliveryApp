import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import { logoutUser,refreshAccessToken} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router(); // ✅ Create router instance first

router.post("/register", 
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "coverImage",
            maxCount:1,
        }
    ]),
    registerUser); // ✅ Correct usage

    router.route("/login").post(loginUser)
    // // Secured routes
     router.route("/logout").post(verifyJWT,logoutUser)
     router.route("/refresh-token").post(refreshAccessToken)
    

export default router;
