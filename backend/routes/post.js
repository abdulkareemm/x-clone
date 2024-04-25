import express from "express";
import { isAuth } from "../middlewares/auth.js";
import { commentOnPost, createPost, deletePost } from "../controller/post.js";
const router = express.Router();


router.post("/create",isAuth,createPost)
router.delete("/delete/:id",isAuth,deletePost)
router.post("/comment/:id", isAuth, commentOnPost);





export default router;
