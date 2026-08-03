"use server";

import dbConnect from "@/lib/db";
import AssociationMember from "@/lib/models/AssociationMember";
import { isAuthenticated } from "@/lib/auth";

export async function createAssociationMember({
  name,
  year,
  designation,
  mailId,
  imageUrl,
}) {
  try {
    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }
    await dbConnect();
    const newMember = new AssociationMember({
      name,
      year,
      designation,
      mailId,
      imageUrl,
    });
    await newMember.save();
    return {
      message: "Association member created successfully",
    };
  } catch (error) {
    console.error("Failed to create association member:", error);
    throw new Error("Failed to create association member");
  }
}

export async function getAssociationMembers() {
  try {
    await dbConnect();
    const members = await AssociationMember.find({});
    return JSON.parse(JSON.stringify(members));
  } catch (error) {
    console.error("Failed to fetch association members:", error);
    throw new Error("Failed to fetch association members");
  }
}

export async function deleteAssociationMember(memberId) {
  try {
    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }
    await dbConnect();
    const deletedMember = await AssociationMember.findByIdAndDelete(memberId);
    if (!deletedMember) {
      throw new Error("Association member not found");
    }
    return { message: "Association member deleted successfully" };
  } catch (error) {
    console.error("Failed to delete association member:", error);
    throw new Error("Failed to delete association member");
  }
}
