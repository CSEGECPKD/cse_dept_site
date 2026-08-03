import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  imgDescription: {
    type: String,
    required: true,
  },
});

const Gallery =
  mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);

export default Gallery;
