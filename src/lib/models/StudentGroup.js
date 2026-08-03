import mongoose from "mongoose";

const studentGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
});

const StudentGroup =
  mongoose.models.StudentGroup ||
  mongoose.model("StudentGroup", studentGroupSchema);

export default StudentGroup;
