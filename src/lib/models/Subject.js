import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  yearOfScheme: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  subCode: {
    type: String,
    required: true,
  },
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

const Subject =
  mongoose.models.Subject || mongoose.model("Subject", subjectSchema);

export default Subject;
