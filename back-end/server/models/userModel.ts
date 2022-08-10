import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
      maxLength: [20, "Name max 20 chars allow"],
    },
    account: {
      type: String,
      required: [true, "Please enter your email or phone"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Password min 6 chars allow"],
    },
    avatar: { type: String, default: "../assets/avatar.png" },
    role: {
      type: String,
      default: "user",
    },
    type: {
      type: String,
      default: "normal",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Users", userSchema);
