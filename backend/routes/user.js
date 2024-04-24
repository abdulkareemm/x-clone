import express from "express";
import {isAuth} from "../middlewares/auth.js"
import { followUnFollowUser, getUserProfile } from "../controller/user.js";
const router = express.Router();

router.get("/profile/:username",isAuth,getUserProfile)
router.get("/follow/:id", isAuth, followUnFollowUser);




export default router;
