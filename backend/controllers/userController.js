const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const registerUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const emailRegex = validateEmail(email);

    if (!name || !password || !email) {
      throw new Error("Please fill all the fields");
    } else if (password.length < 10) {
      throw new Error("Password needs to be of 10 chars");
    } else if (!emailRegex) {
      throw new Error("Invalid email addrs");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // generating a encrypted psswd
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //creating new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        msg: "User successfully created!",
        _id: user._id,
        name: user.name,
      });
    } else {
      throw new Error("invalid user");
    }
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // compares user entered password with the hashed password from db
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({ name: user.name, email: user.email });
    } else {
      throw new Error("invalid user");
    }
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};
const getMe = (req, res) => {
  res.json({ msg: "user details" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
