import { User } from "../model/user.modules.js";

const generateAccessTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();

    await user.save({ validateBeforeSave: false });

    return { accessToken };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const createUser = async (req, res) => {
  try {
    const { name, dob, email, password } = req.body;
    if (!name || !dob || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(401).json({
        success: false,
        message: "User already existed",
      });
    }

    const user = await User.create({
      name,
      dob,
      email,
      password,
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (await User.find(user._id)) {
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        createdUser,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      err,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email or password required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "username is invalid",
      });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    // generate jwt token containing userid
    const { accessToken } = await generateAccessTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json({
        success: true,
        user: [loggedInUser, accessToken],
        message: "User logged In Successfully",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user?._id);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200).clearCookie("accessToken", options).json({
      success: true,
      message: "User logged Out",
      user: [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};

export { createUser, loginUser, logoutUser };
