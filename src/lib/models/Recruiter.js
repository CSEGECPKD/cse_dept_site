import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyLogo: {
    type: String,
    required: true,
  },
});

const Recruiter =
  mongoose.models.Recruiter || mongoose.model("Recruiter", recruiterSchema);

export default Recruiter;
