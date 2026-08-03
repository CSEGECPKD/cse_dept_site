import mongoose from "mongoose";

const generalSchema = new mongoose.Schema({
  hodMessage: {
    type: String,
    required: true,
  },
  hodImage: {
    type: String,
    required: true,
  },
  hodName: {
    type: String,
    required: true,
  },
  hodDesignation: {
    type: String,
    required: true,
  },
});

const General =
  mongoose.models.General || mongoose.model("General", generalSchema);

export default General;
