import React from "react";
import Blog from "./blog/page";
import Events from "./events/page";
import Magazine from "./magazin/page";
import Student from "./student_gp/page";

export default function page() {
  return (
    <div>
      <Blog />
      <Events />
      <Magazine />
      <Student />
    </div>
  );
}
