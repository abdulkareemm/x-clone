import createHttpError from "http-errors";
import { savePost } from "../service/post.service.js";

export const createPost = async (req, res, next) => {
  try {
    const { text } = req.body;
    let { img } = req.body;
    const user = req.user;
    if (!text && !img) {
      throw createHttpError.BadRequest("Post must have text or image");
    }

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }
    const newPost = await savePost(text, img, user._id);
    res.status(201).json({
      msg: "Post saved successfully",
      post: newPost,
    });
  } catch (error) {
    next(error);
  }
};
