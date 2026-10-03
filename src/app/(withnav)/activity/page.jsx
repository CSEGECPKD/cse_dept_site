import React from "react";
import Events from "./events/page";
import Magazine from "./magazine/page";
import Student from "./student_gp/page";

export default function page() {
  return (
    <div>
      <Events />
      <Magazine />
      <Student />
    </div>
  );
}
