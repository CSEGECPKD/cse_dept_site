import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;
