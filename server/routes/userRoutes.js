import express from "express";
const router = express.Router();
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  try {
    //check if user exists or not
    const userExists = await User.findOne({ email: email });

    if (!userExists) {
      return res.status(400).json({ message: "User not found" });
    }

    // compare the passwords
    const isMatch = await bcrypt.compare(password, userExists.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // if everything is ok then crate a jwt token

    const token = jwt.sign(
      // this is payload
      {
        id: userExists.id,
        email: userExists.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: userExists.id,
        name: userExists.name,
        email: userExists.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internel server error" });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check if user exista already in the database
    const userExists = await User.findOne({ email: email });

    // if userExists end the function
    if (userExists) {
      return res.status(400).json({ message: "User exists already" });
    }
    // otherwise hash the password and create a user
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).json({ message: "User registered successfully!", newUser });
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default router;
