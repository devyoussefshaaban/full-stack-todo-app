import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 10,
    maxLength: 30,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minLength: 10,
    kMaxLength: 300,
  },
  deadline: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Task = model("Task", taskSchema);
export default Task;
