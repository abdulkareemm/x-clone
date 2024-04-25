import express from "express";
import { isAuth } from "../middlewares/auth.js";
import { createPost } from "../controller/post.js";
const router = express.Router();


router.post("/create",isAuth,createPost)




export default router;
