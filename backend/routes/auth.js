
import express from "express";
const router = express.Router();

import { register,login } from "../controller/auth.js";
// import { logout, refreshToken } from "../services/auth.service.js";
router.post("/create",  register);
router.post("/login",  login);
// router.get("/logout", trimRequest.all, logout);
// router.get("/refreshtoken", trimRequest.all, refreshToken);

export default router;
