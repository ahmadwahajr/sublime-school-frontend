import React, { useState, useEffect, createContext } from "react";
import Header from "./StudentHeader";
import TableWrapper from "./Table/TableWrapper";
import { getStudentsdata } from "../../redux/actions/student-actions";
import StudentFooter from "./Footer/StudentFooter";
export const StudentContext = createContext(null);
function StudentWrapper({ message, InsertOrUpdate }) {
  const [filters, setFilters] = useState({
    classNo: "playgroup",
    enrolledIn: "school"
  });

  const [tableData, settableData] = useState({
    data: [],
    loading: true,
    paginationSize: 15
  });

  const dataFetch = async filters => {
    settableData(prevData => {
      return { ...prevData, loading: true };
    });
    const data = await getStudentsdata(filters);
    if (data) {
      settableData(prevData => {
        return { ...prevData, loading: false, data: data };
      });
    } else {
      settableData(prevData => {
        return { ...prevData, loading: false };
      });
    }
  };
  useEffect(() => {
    dataFetch(filters);
    return () => {
      dataFetch();
    };
  }, [filters]);

  const enrollment = filters.enrolledIn === "school" ? "School" : "Academy";
  const messages = enrollment + " " + message;

  return (
    <div style={{ padding: "40px 20px" }}>
      <StudentContext.Provider
        value={{ filters, setFilters, tableData, settableData }}
      >
        <Header message={messages} />
        <TableWrapper />
        <StudentFooter />
      </StudentContext.Provider>
    </div>
  );
}

export default StudentWrapper;
