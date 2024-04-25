
import createHttpError from "http-errors"
import Post from "../models/Post.js"
import { v2 as cloudinary}from "cloudinary"

export const savePost = async (text,img,id)=>{
const newPost = new Post({
    user:id,
    text,
    img
})
await newPost.save()
return newPost
}

export const removePost = async (id,userId)=>{
    const post = await Post.findById(id);
    if (!post) {
        throw createHttpError.NotFound("Post not found")
    }

    if (post.user.toString() !== userId.toString()) {
      throw createHttpError
        .Unauthorized("You are not authorized to delete this post")
    }

    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    await Post.findByIdAndDelete(id);
    return true
}