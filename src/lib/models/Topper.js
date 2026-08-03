import mongoose from "mongoose";

const topperSchema = mongoose.model(
  "Topper",
  new mongoose.Schema({
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    sem: {
      type: String,
      required: true,
    },
    cgpa: {
      type: Number,
      required: true,
    },
    sgpa: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  }),
);

const Topper = mongoose.models.Topper || topperSchema;

export default Topper;
