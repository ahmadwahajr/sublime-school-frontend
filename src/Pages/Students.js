import React from "react";
import ChildPage from "../Components/Students/StudentWrapper.js";
import { useState, useEffect } from "react";
import axios from "axios";
import fetchUrl from "../fetchURL";
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
