import mongoose from "mongoose";
import User from "./User";

const sessionSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      ref: User.modelName,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { _id: false },
);

const Session =
  mongoose.models.Session || mongoose.model("Session", sessionSchema);

export default Session;
