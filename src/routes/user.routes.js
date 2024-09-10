import { Router } from "express";
import {registerUser} from "../controllers/user.controllers.js";
import upload from "../routes/user.route.js"


const router = Router()
router.route("/register").post(registerUser)

upload.field([
    {name:"avatar",
        maxCount:1
    },
    {
        name:"coverImage",
        maxCount:1
    }
]),registerUser

export default router