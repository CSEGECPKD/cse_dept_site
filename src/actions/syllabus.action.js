"use server";

import dbConnect from "../lib/db";
import Syllabus from "../lib/models/Syllabus";
import { isAuthenticated } from "../lib/auth";

export async function getSyllabi() {
  try {
    await dbConnect();
    const syllabi = await Syllabus.find({}).populate("course");
    return JSON.parse(JSON.stringify(syllabi));
  } catch (error) {
    console.error("Failed to fetch syllabi:", error);
    throw new Error("Failed to fetch syllabi");
  }
}

export async function createSyllabus({
  course,
  sem,
  yearOfScheme,
  syllabusId,
  pdfUrl,
}) {
  try {
    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }
    await dbConnect();

    // Check if syllabus already exists
    const existingSyllabus = await Syllabus.findOne({ syllabusId });
    if (existingSyllabus) {
      throw new Error("Syllabus with this ID already exists");
    }

    const newSyllabus = new Syllabus({
      course,
      sem,
      yearOfScheme,
      syllabusId,
      pdfUrl,
    });
    await newSyllabus.save();
    return {
      message: "Success",
    };
  } catch (error) {
    console.error("Failed to create syllabus:", error);
    throw new Error("Failed to create syllabus: " + error.message);
  }
}

export async function deleteSyllabus(syllabusId) {
  try {
    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }
    await dbConnect();
    const deletedSyllabus = await Syllabus.findOneAndDelete({ syllabusId });
    if (!deletedSyllabus) {
      throw new Error("Syllabus not found");
    }
    return { message: "Syllabus deleted successfully" };
  } catch (error) {
    console.error("Failed to delete syllabus:", error);
    throw new Error("Failed to delete syllabus");
  }
}
