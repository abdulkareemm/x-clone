import express from "express";
import {isAuth} from "../middlewares/auth.js"
import { getUserProfile } from "../controller/user.js";
const router = express.Router();

router.get("/profile/:username",isAuth,getUserProfile)



export default router;
