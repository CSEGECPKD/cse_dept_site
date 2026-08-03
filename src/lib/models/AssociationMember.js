import mongoose from "mongoose";

const associationMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  mailId: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const AssociationMember =
  mongoose.models.AssociationMember ||
  mongoose.model("AssociationMember", associationMemberSchema);

export default AssociationMember;
