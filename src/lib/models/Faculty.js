import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  yearOfJoin: {
    type: String,
    required: true,
  },
  yearOfDept: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Faculty =
  mongoose.models.Faculty || mongoose.model("Faculty", facultySchema);

export default Faculty;
