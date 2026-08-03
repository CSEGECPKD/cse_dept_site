import mongoose from "mongoose";

const advisoryBoardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const AdvisoryBoard =
  mongoose.models.AdvisoryBoard ||
  mongoose.model("AdvisoryBoard", advisoryBoardSchema);

export default AdvisoryBoard;
