import React from "react";
import ChildPage from "./DocPWrapper.js";
import { useState, useEffect } from "react";
import axios from "axios";
import fetchUrl from "../fetchURL";
import InsertComp from "../Components/InsertPatients";
import UpdateComp from "../Components/UpdatePatient";
function Patients() {
  const [tableData, settableData] = useState({
    data: [],
    columns: [
      {
        title: "ID",
        dataIndex: "key",
      },
      {
        title: "Name",
        dataIndex: "name",
      },
      {
        title: "Disease",
        dataIndex: "disease",
      },
      {
        title: "Contact",
        dataIndex: "contact",
      },
      {
        title: "Address",
        dataIndex: "address",
      },
    ],
    loading: true,
    paginationSize: 15,
  });

  useEffect(() => {
    const fetchData = () => {
      axios.get(`${fetchUrl}/getPatientsData`).then(res => {
        settableData(prevData => {
          return { ...prevData, loading: false, data: res.data };
        });
      });
    };
    fetchData();
  }, []);
  const deleteData = {
    link: "/deletePatientsData",
  };
  return (
    <div>
      <ChildPage
        message="Patients Records"
        tableData={tableData}
        deleteData={deleteData}
        InsertComp={InsertComp}
        UpdateComp={UpdateComp}
      />
    </div>
  );
}

export default Patients;
