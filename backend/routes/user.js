import express from "express";
import {isAuth} from "../middlewares/auth.js"
import { followUnFollowUser, getSuggestedUsers, getUserProfile, updateUser } from "../controller/user.js";
const router = express.Router();

router.get("/profile/:username",isAuth,getUserProfile)
router.get("/follow/:id", isAuth, followUnFollowUser);
router.get("/suggested/",isAuth, getSuggestedUsers)
router.put("/update",isAuth,updateUser)




export default router;
