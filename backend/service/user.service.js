import createHttpError from "http-errors";
import User from "../models/User.js";
export const findProfileUserByUserName = async (username) => {

    const user = await User.findOne({ username }).select("-password");
    //  check if acount not exist
    if (!user) {
      throw createHttpError.NotFound("User not found.");
    }
    return user
};
