import { Router } from "express";
import registerUser from "../controllers/user.controllers.js";
import { upload } from "../middleware/multer.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  (req, res) => {
    // Call the registerUser function here
    registerUser(req, res);
  }
);

export default router;