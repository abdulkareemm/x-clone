
import express from "express";
const router = express.Router();

import { register } from "../controller/auth.js";
// import { logout, refreshToken } from "../services/auth.service.js";
router.post("/create",  register);
// router.post("/login", trimRequest.all, login);
// router.get("/logout", trimRequest.all, logout);
// router.get("/refreshtoken", trimRequest.all, refreshToken);

export default router;
