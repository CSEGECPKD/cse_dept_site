import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pdfUrl: {
    type: String,
    required: true,
  },
});

const Facility =
  mongoose.models.Facility || mongoose.model("Facility", facilitySchema);

export default Facility;
