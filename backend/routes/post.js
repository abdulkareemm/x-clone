import express from "express";
import { isAuth } from "../middlewares/auth.js";
import { createPost, deletePost } from "../controller/post.js";
const router = express.Router();


router.post("/create",isAuth,createPost)
router.delete("/:id",isAuth,deletePost)




export default router;
