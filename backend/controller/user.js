import {
  findProfileUserByUserName,
  findUserByAttribute,
  findUserById,
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
    res.json(userToModify);
  } catch (error) {
    next(error);
  }
};
