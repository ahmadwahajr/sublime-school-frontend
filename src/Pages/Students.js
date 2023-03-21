import React from "react";
import ChildPage from "../Components/Students/StudentWrapper.js";
import InsertOrUpdate from "../Components/Students/InsertStudentsData";
function Students() {
  const deleteData = {
    link: "/deleteDoctorsData"
  };
  return (
    <>
      <ChildPage
        message="Students Records"
        deleteData={deleteData}
        InsertOrUpdate={InsertOrUpdate}
      />
    </>
  );
}

export default Students;
