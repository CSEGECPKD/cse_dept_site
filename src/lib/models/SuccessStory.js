import mongoose from "mongoose";

const successStorySchema = new mongoose.Schema({
  personType: {
    type: String,
    enum: ["alumni", "student"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  person: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

const SuccessStory =
  mongoose.models.SuccessStory ||
  mongoose.model("SuccessStory", successStorySchema);

export default SuccessStory;
