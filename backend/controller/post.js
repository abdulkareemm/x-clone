import createHttpError from "http-errors";
import {
    allLikedPost,
    allPosts,
  getUserPostByUsername,
  removePost,
  saveCommentOnPost,
  savePost,
  updateLikes,
} from "../service/post.service.js";

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

export const deletePost = async (req, res, next) => {
  try {
    await removePost(req.params.id, req.user._id);

    res.json({ msg: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const commentOnPost = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) {
      throw createHttpError.BadRequest("Text field is required");
    }
    const post = await saveCommentOnPost(text, req.params.id, req.user._id);
    res.json(post);
  } catch (error) {
    next(error);
  }
};
export const likeUnlikePost = async(req,res,next)=>{
    try {
        const Likes = await updateLikes(req.params.id,req.user._id); 
        res.json(Likes)
    } catch (error) {
        next(error)
    }
}
export const getAllPosts = async (req, res, next)=>{
    try {
        const posts = await allPosts()
        res.json(posts)
    } catch (error) {
        next(error)
    }
}
export const getLikedPosts = async (req, res, next)=>{
    try {
        const likedPosts = await allLikedPost(req.user)
        res.json(likedPosts)
    } catch (error) {
        next(error)
    }
}
export const getFollowingPosts  = async (req, res, next)=>{
    try {
        const followingPosts = await allFollowingPost(req.user)
        res.json(followingPosts)
        
    } catch (error) {
        next(error)
    }
}
export const getUserPosts  = async (req, res, next)=>{
    try {
        const posts = await getUserPostByUsername(req.params.username)
        res.json(posts)
    } catch (error) {
        next(error)
    }
}
