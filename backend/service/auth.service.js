import createHttpError from "http-errors";
import  User  from "../models/User.js";
import validator from "validator";
// import bcrypt from "bcryptjs";

export const createUser = async (userData) => {
  const { username, fullName, password, email } = userData;

  //  check if fields are empty
  if (!username || !fullName || !email || !password) {
    throw createHttpError.BadRequest("Please fill all fields");
  }
  // check name length
  if (
    !validator.isLength(username, {
      min: 3,
      max: 16,
    })
  ) {
    throw createHttpError.BadRequest(
      "Please make sure your username is between 3 and 16 characters"
    );
  }
  //  check email is valid
  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest(
      "Please make sure to provide a valid email."
    );
  }
  //  check user is exist
  const checkDb = await User.findOne({ email });
  if (checkDb) {
    throw createHttpError.Conflict("Please try again with a different email.");
  }
  //  check password length
  if (
    !validator.isLength(password, {
      min: 8,
      max: 128,
    })
  ) {
    throw createHttpError(
      "Please make sure your password is between 8 and 128 characters"
    );
  }
  const user = await new User({
    username,
    fullName,
    email,
    password,
  }).save();

  return user;
};
