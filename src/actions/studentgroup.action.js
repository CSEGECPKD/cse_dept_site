"use server";

import dbConnect from "@/lib/db";
import StudentGroup from "@/lib/models/StudentGroup";
import { isAuthenticated } from "@/lib/auth";

export async function createStudentGroup({ name, description, logoUrl }) {
  try {
    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }
    // throw new Error("Test Error");
    await dbConnect();
    const newStudentGroup = new StudentGroup({ name, description, logoUrl });
    await newStudentGroup.save();
    return {
      data: "Successfully Created",
    };
  } catch (error) {
    console.error("Failed to create student group:", error);
    throw new Error("Failed to create student group");
  }
}

export async function getStudentGroups() {
  try {
    await dbConnect();
    const studentGroups = await StudentGroup.find({});
    return JSON.parse(JSON.stringify(studentGroups));
  } catch (error) {
    console.error("Failed to fetch student groups:", error);
    throw new Error("Failed to fetch student groups");
  }
}

export async function deleteStudentGroup(studentGroupId) {
  try {
    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }
    await dbConnect();
    const deletedStudentGroup =
      await StudentGroup.findByIdAndDelete(studentGroupId);
    if (!deletedStudentGroup) {
      throw new Error("Student group not found");
    }
    return { message: "Student group deleted successfully" };
  } catch (error) {
    console.error("Failed to delete student group:", error);
    throw new Error("Failed to delete student group");
  }
}
