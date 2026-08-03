"use server";

import dbConnect from "@/lib/db";
import SuccessStory from "@/lib/models/SuccessStory";
import { isAuthenticated } from "@/lib/auth";

export async function createSuccessStory({ personType, name, person, year }) {
  try {
    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }
    await dbConnect();
    const newSuccessStory = new SuccessStory({
      personType,
      name,
      person,
      year,
    });
    await newSuccessStory.save();
    return newSuccessStory;
  } catch (error) {
    console.error("Failed to create success story:", error);
    throw new Error("Failed to create success story");
  }
}

export async function getSuccessStories() {
  try {
    await dbConnect();
    const successStories = await SuccessStory.find({});
    return JSON.parse(JSON.stringify(successStories));
  } catch (error) {
    console.error("Failed to fetch success stories:", error);
    throw new Error("Failed to fetch success stories");
  }
}

export async function deleteSuccessStory(successStoryId) {
  try {
    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }
    await dbConnect();
    const deletedSuccessStory =
      await SuccessStory.findByIdAndDelete(successStoryId);
    if (!deletedSuccessStory) {
      throw new Error("Success story not found");
    }
    return { message: "Success story deleted successfully" };
  } catch (error) {
    console.error("Failed to delete success story:", error);
    throw new Error("Failed to delete success story");
  }
}
