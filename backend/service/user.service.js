import createHttpError from "http-errors";
import User from "../models/User.js";

export const findUserById = async (id, selected = "") => {
  const user = await User.findById(id).select(selected);
  return user;
};
export const findUserByAttribute = async (attribute, selected = "") => {
  const user = await User.findOne( attribute ).select(selected);
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
