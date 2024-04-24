
import express from "express";
import {isAuth} from "../middlewares/auth.js"
const router = express.Router();

import { register,login,logout } from "../controller/auth.js";
router.post("/create",  register);
router.post("/login",  login);
router.get("/logout", logout);
router.get("/test", isAuth);


export default router;
