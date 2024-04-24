
import express from "express";
const router = express.Router();

import { register,login,logout } from "../controller/auth.js";
router.post("/create",  register);
router.post("/login",  login);
router.get("/logout", logout);


export default router;
