import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username == "" ||
    password == "" ||
    email == ""
  ) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }

  try {
    const hashedPassword = bcryptjs.hashSync(password, 12);
    const verifyExistance = await User.findOne({ email });
    // console.log(verifyExistance);
    if (verifyExistance) {
      // next(errorHandler(400,"User already exists"))
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    console.log(newUser._doc);

    res.status(200).json({ message: "Signup Successfull" });
  
  } catch (error) {
    res.status(200).json({ message: error.message, success: false });
  }
};
