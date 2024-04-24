import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { findUserById } from "../service/user.service.js";

export const isAuth = async(req,res,next)=>{
    try {
        const token = req.cookies.refreshtoken;
        if (!token) {
          return next(
            createHttpError.Unauthorized("Unauthorized: No Token Provided")
          );
        }
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

        if (!decoded) {
          return next(
            createHttpError.Unauthorized("Unauthorized: Invalid Token")
          );
        }

        const user = await findUserById(decoded.userId,"-password")

        if (!user) {
          return next(
            createHttpError.NotFound("User not found: " + decoded.userId)
          );
        }

        req.user = user;
        next();
    } catch (error) {
        next(error)
    }
}