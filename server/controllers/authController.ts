import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import generateToken from "../helpers/generateToken";
import { loginUserSchema, registerUserSchema } from "../helpers/validation";

export const registerUser = expressAsyncHandler(
  async (req: Request<{}, {}, RegisterBody>, res: Response) => {
    try {
      const { body: { name, email, password } = {} } = req;

      await registerUserSchema.validate({ name, email, password });

      if (await User.findOne({ name })) {
        throw new Error("User with same name already exists");
      }

      if (await User.findOne({ email })) {
        throw new Error("User with same email already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      newUser.token = generateToken(newUser._id.toString());

      await newUser.save();

      res.status(201).json({
        success: true,
        message: "Signed in successfully",
        data: newUser,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
);

export const loginUser = expressAsyncHandler(
  async (req: Request<{}, {}, LoginBody>, res: Response) => {
    try {
      const { body: { email, password } = {} } = req;

      await loginUserSchema.validate({ email, password });

      const user = await User.findOne({ email });

      if (!user) {
        res.status(403);
        throw new Error("User not found");
      }

      if (user && !(await bcrypt.compare(password, user.password)))
        throw new Error("Incorrect password.");

      user.token = generateToken(user._id.toString());

      await user.save();

      res
        .status(201)
        .json({ success: true, message: "Logged in successfully", data: user });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
);

export const getMe = expressAsyncHandler(
  async (req: Request<{}, {}, GetMeBody>, res: Response) => {
    try {
      const { user } = req;

      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
);
