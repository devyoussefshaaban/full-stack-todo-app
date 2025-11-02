import { Schema, model } from "mongoose";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 10,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  token: String,
});

const User = model<IUser>("User", userSchema);
export default User;
