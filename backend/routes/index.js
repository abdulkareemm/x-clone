import express from "express";
import authRoute from "./auth.js";
import postRoute from "./post.js";
// import messageRoute from "./message.js";
import userRoute from "./user.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/post", postRoute);
// router.use("/message", messageRoute);

export default router;
