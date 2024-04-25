import createHttpError from "http-errors";
import {
  findProfileUserByUserName,
  findUserByAttribute,
  findUserById,
  followUnFollow,
} from "../service/user.service.js";

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await findProfileUserByUserName(req.params.username);
    res.json({
      msg: "User profile found",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const followUnFollowUser = async (req, res, next) => {
  try {
    const userToModify = await findUserById(
      { _id: req.params.id },
      "-password"
    );
    const currentUser = req.user;
    if (!userToModify) {
      return next(createHttpError.NotFound("user not found"));
    }
    if (userToModify._id.toString() === currentUser._id.toString()) {
      return next(
        createHttpError.BadRequest("You can't follow/un follow yourself")
      );
    }
    const msg= await followUnFollow(currentUser, userToModify)
    res.json(msg)
  } catch (error) {
    next(error);
  }
};
