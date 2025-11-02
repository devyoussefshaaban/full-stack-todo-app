import jwt from "jsonwebtoken";
import User from "../models/userModel";
import type { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // or a specific IUserDocument
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const headerAuth = req.headers.authorization;
  let token = null;

  try {
    if (headerAuth && headerAuth.startsWith("Bearer ")) {
      token = headerAuth.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY ?? null
      ) as jwt.JwtPayload;

      const { userId } = decoded;

      const user = await User.findById(userId);

      if (!user) return res.status(403).json("User not found");

      req.user = user;

      next();
    } else {
      res
        .status(401)
        .json({ success: false, message: "Not authorized, not token" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
