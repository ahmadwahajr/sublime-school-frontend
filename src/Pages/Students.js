import React from "react";
import ChildPage from "../Components/Students/StudentWrapper.js";
import InsertOrUpdate from "../Components/Students/StudentCUD.js";
function Students() {
  return (
    <>
      <ChildPage message="Students Records" InsertOrUpdate={InsertOrUpdate} />
    </>
  );
}

export default Students;
