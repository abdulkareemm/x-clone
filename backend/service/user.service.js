import createHttpError from "http-errors";
import User from "../models/User.js";

export const findUserById = async (id, selected = "") => {
  const user = await User.findById(id).select(selected);
  return user;
};
export const findUserByAttribute = async (attribute, selected = "") => {
  const user = await User.findOne(attribute).select(selected);
  return user;
};
export const findProfileUserByUserName = async (username) => {
  const user = await User.findOne({ username }).select("-password");
  //  check if account not exist
  if (!user) {
    throw createHttpError.NotFound("User not found.");
  }
  return user;
};

export const followUnFollow = async (user1, user2) => {
  const isFollowing = user1.following.includes(user2._id.toString());
  if (isFollowing) {
    await User.findByIdAndUpdate(user1._id, {
      $pull: { followers: user2._id },
    });
    await User.findByIdAndUpdate(user2._id, {
      $pull: { following: user1._id },
    });
    return { msg: "User un followed successfully" };
  } else {
    await User.findByIdAndUpdate(user1._id, {
      $push: { following: user2._id },
    });
    await User.findByIdAndUpdate(user2._id, {
      $push: { followers: user1._id },
    });
    return { msg: "User followed successfully" };
  }
};

export const getUsersWithoutMe = async (id, size) => {
  const users = await User.aggregate([
    {
      $match: {
        _id: { $ne: id },
      },
    },
    { $sample: { size: size } },
  ]);
  return users
};
