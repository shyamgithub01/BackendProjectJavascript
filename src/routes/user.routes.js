import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middleware/multer.js";

const router = Router();

// Apply the multer middleware and the controller directly
router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },       // Field name "avatar"
    { name: "coverImage", maxCount: 1 }    // Field name "coverImage"
  ]),
  registerUser                            // Pass the controller directly
);

export default router;
