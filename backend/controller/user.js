import { findProfileUserByUserName } from "../service/user.service.js";

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
