import createHttpError from "http-errors";
import Post from "../models/Post.js";
import User from "../models/User.js";

import { v2 as cloudinary } from "cloudinary";

export const savePost = async (text, img, id) => {
  const newPost = new Post({
    user: id,
    text,
    img,
  });
  await newPost.save();
  return newPost;
};

export const removePost = async (id, userId) => {
  const post = await Post.findById(id);
  if (!post) {
    throw createHttpError.NotFound("Post not found");
  }

  if (post.user.toString() !== userId.toString()) {
    throw createHttpError.Unauthorized(
      "You are not authorized to delete this post"
    );
  }

  if (post.img) {
    const imgId = post.img.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(imgId);
  }

  await Post.findByIdAndDelete(id);
  return true;
};

export const saveCommentOnPost = async (text, postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw createHttpError.NotFound("Post not found");
  }
  const comment = { user: userId, text };

  post.comments.push(comment);
  await post.save();
  return post
};
export const updateLikes = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw createHttpError.NotFound("Post not found");
  }

  const userLikedPost = post.likes.includes(userId);
  if (userLikedPost) {
    // Unlike post
    await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
    await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

    const Likes = post.likes.filter(
      (id) => id.toString() !== userId.toString()
    );
    return Likes;
  } else {
    // Like post
    post.likes.push(userId);
    await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
    await post.save();

    const Likes = post.likes;
    return Likes;
  }
};
