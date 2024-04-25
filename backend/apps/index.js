import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import createHttpError from "http-errors";
import db from "../configs/db.js";
import routers from "../routes/index.js";
import {v2 as cloudinary} from "cloudinary"

/// dotenv configuration
dotenv.config();

//  cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//  connect to database
db();

/// create express app
const app = express();


///  parse json request url
app.use(express.json());

///  parse json request body
app.use(express.urlencoded({ extended: true }));


///  cookie parser
app.use(cookieParser());


///  cors
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

///  routes
app.use("/api/v1", routers);

///  page not fount
app.use(async (req, res, next) => {
  next(createHttpError.NotFound("This route does not exist."));
});

///  error handling
app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      msg: err.message,
    },
  });
});

/// export express app
export default app;
