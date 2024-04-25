import createHttpError from "http-errors";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";

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
  return users;
};

export const updateUserService = async (data, user) => {
  const { fullName, email, username, currentPassword, newPassword, bio, link } =
    data;
  let { profileImg, coverImg } = data;
  if ((!newPassword && currentPassword) || (!currentPassword && newPassword)) {
    throw createHttpError.BadRequest(
      "Please provide both current password and new password"
    );
  }
  if (currentPassword && newPassword) {
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      throw createHttpError.BadRequest("Current password is incorrect");
    if (newPassword.length < 6) {
      throw createHttpError.BadRequest(
        "Password must be at least 6 characters long"
      );
    }
    user.password = newPassword;
  }
  if (profileImg) {
    if (user.profileImg) {
      // https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
      await cloudinary.uploader.destroy(
        user.profileImg.split("/").pop().split(".")[0]
      );
    }

    const uploadedResponse = await cloudinary.uploader.upload(profileImg);
    profileImg = uploadedResponse.secure_url;
  }
  if (coverImg) {
    if (user.coverImg) {
      await cloudinary.uploader.destroy(
        user.coverImg.split("/").pop().split(".")[0]
      );
    }

    const uploadedResponse = await cloudinary.uploader.upload(coverImg);
    coverImg = uploadedResponse.secure_url;
  }
  user.fullName = fullName || user.fullName;
  user.email = email || user.email;
  user.username = username || user.username;
  user.bio = bio || user.bio;
  user.link = link || user.link;
  user.profileImg = profileImg || user.profileImg;
  user.coverImg = coverImg || user.coverImg;

  user = await user.save();
  return user
};
