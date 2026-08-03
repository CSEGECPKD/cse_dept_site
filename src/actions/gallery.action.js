"use server";

import dbConnect from "../lib/db";
import Gallery from "../lib/models/Gallery";
import { isAuthenticated } from "../lib/auth";

export async function getGalleries() {
  try {
    await dbConnect();
    const galleries = await Gallery.find({});
    return JSON.parse(JSON.stringify(galleries));
  } catch (error) {
    console.error("Failed to fetch galleries:", error);
    throw new Error("Failed to fetch galleries");
  }
}

export async function createGallery({ name, image, imgDescription }) {
  try {
    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }
    await dbConnect();
    const newGallery = new Gallery({ name, image, imgDescription });
    await newGallery.save();
    return {
      message: "Created successfully",
    };
  } catch (error) {
    console.error("Failed to create gallery:", error);
    throw new Error("Failed to create gallery");
  }
}

export async function deleteGallery(galleryId) {
  try {
    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }
    await dbConnect();
    const deletedGallery = await Gallery.findByIdAndDelete(galleryId);
    if (!deletedGallery) {
      throw new Error("Gallery not found");
    }
    return { message: "Gallery deleted successfully" };
  } catch (error) {
    console.error("Failed to delete gallery:", error);
    throw new Error("Failed to delete gallery");
  }
}
