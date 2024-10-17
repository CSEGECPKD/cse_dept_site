"use client";

import React from "react";
import ListItem from "../ListItem";
import { deleteCourse } from "@/actions/course.action";

const CourseList = ({ courseList }) => {
  return (
    <div className="space-y-1">
      <h2 className="text-right text-3xl font-medium">ALREADY ON SITE</h2>
      <ul className="space-y-1">
        {courseList.map((item) => (
          <ListItem
            key={item._id}
            title={item.name}
            handleDelete={async () => {
              await deleteCourse(item._id);
            }}
          />
        ))}
        {courseList.length === 0 && (
          <p className="text-center text-red-500">No Data</p>
        )}
      </ul>
    </div>
  );
};

export default CourseList;
