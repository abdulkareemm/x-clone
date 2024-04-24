import { createUser, loginUser } from "../service/auth.service.js";
import { generateToken } from "../service/token.service.js";

export const register = async (req, res, next) => {
  try {
    const newUser = await createUser(req.body);
    const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

    const access_token = await generateToken(
      { userId: newUser._id },
      "1d",
      ACCESS_TOKEN_SECRET
    );
    const refresh_token = await generateToken(
      { userId: newUser._id },
      "30d",
      REFRESH_TOKEN_SECRET
    );
    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refresh_token",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.json({
      msg: "register success",
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        followers: newUser.followers,
        following: newUser.following,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg,
        token: access_token,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const login = async (req, res,next) => {
  try {
    const user = await loginUser(req.body)
    const access_token = await generateToken(
      { userId: user._id },
      "1d",
      process.env.ACCESS_TOKEN_SECRET
    );
    const refresh_token = await generateToken(
      { userId: user._id },
      "30d",
      process.env.REFRESH_TOKEN_SECRET
    );
    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refresh_token",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.json({
      msg: "login success",
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        followers: user.followers,
        following: user.following,
        profileImg: user.profileImg,
        coverImg: user.coverImg,
        token: access_token,
      },
    });
    
  } catch (error) {
    console.log(error)
    next(error);
  }
}
