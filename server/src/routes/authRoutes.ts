import express, { Request, Response } from "express";
import { User } from "../model/User";
const Router = express.Router();
import { compare, hash } from "bcryptjs";
import { getAccessToken } from "../utils/tokenUtils";
import authValidation from "../middleware/authValidation";

const validEmailRegex = /\S+\@\S+/;

// Login
Router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists in DB
    const gotUser = await User.findOne({ email: email });
    if (!gotUser) {
      throw new Error("User not found");
    }

    // Check if password is correct
    const correctPass = gotUser.password;
    const isValid = await compare(password, correctPass!);
    if (!isValid) {
      throw new Error("Incorrect username or password");
    } else {
      const token = getAccessToken(gotUser);
      res.status(200).json({
        done: true,
        accessToken: token,
      });
    }
  } catch (err) {
    console.log("[ERROR] " + err);
    res.status(401).json({
      done: false,
      error: err,
    });
  }
});

// Sign Up
Router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { phone, email, password } = req.body;
    if (!phone || !email || !password) {
      res.json({ done: false, error: "Invalid input" });
      return;
    }

    // Check if email is valid
    if (!validEmailRegex.test(email)) {
      res.json({ done: false, error: "Invalid email" });
      return;
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: email }).exec();
    if (existingUser) {
      res.json({ done: false, error: "Email already exists" });
      return;
    }

    // Hash the password
    const hashedPassword = await hash(password, 12);
    const newUser = {
      phone,
      email,
      password: hashedPassword,
    };

    User.create(newUser);
    res.status(200).json({ done: true });
  } catch (err) {
    console.log("[ERROR]: " + err);
    res.json({ done: false, error: err });
  }
});

// Check if JWT is valid
Router.get("/check", authValidation, (_req: Request, res: Response) => {
  return res.json({ done: true });
});

export default Router;
