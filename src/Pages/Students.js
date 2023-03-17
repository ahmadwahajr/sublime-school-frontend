import React from "react";
import ChildPage from "../Components/Students/StudentWrapper.js";
import Insert from "../Components/Students/InsertStudentsData";
import UpdateComp from "../Components/UpdateDoctor";
function Students() {
  const deleteData = {
    link: "/deleteDoctorsData"
  };
  return (
    <>
      <ChildPage
        message="Students Records"
        deleteData={deleteData}
        InsertComp={Insert}
        UpdateComp={UpdateComp}
      />
    </>
  );
}

export default Students;
