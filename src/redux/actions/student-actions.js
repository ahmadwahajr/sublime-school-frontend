import { get, post } from "../../utils/apiCalls";

export const getStudentsdata = async param => {
  try {
    const { data } = await get(
      `${process.env.REACT_APP_API_URL}/api/v1/students/get-students`,
      param
    );

    return [...data.data];
  } catch (err) {
    return [err];
  }
};

export const insertStudentsData = async param => {
  try {
    const data = await post(
      `${process.env.REACT_APP_API_URL}/api/v1/students/add-student`,
      param
    );
    return data;
  } catch (err) {
    if (err?.response?.data?.message) return err?.response?.data?.message;
    else return err;
  }
};

export const addStudentAction = (record, settableData, filters) => {
  if (
    record?.data?.studentData?.classNo === filters?.classNo &&
    record?.data?.studentData?.enrolledIn === filters?.enrolledIn
  )
    settableData(prevData => {
      return { ...prevData, data: [record?.data, ...prevData.data] };
    });
};
export const editStudentData = async param => {
  try {
    const data = await post(
      `${process.env.REACT_APP_API_URL}/api/v1/students/update-student`,
      param
    );

    return data;
  } catch (err) {
    if (err?.response?.data?.message) return err?.response?.data?.message;
    else return err;
  }
};

export const editStudentAction = (record, tableData, settableData, filters) => {
  const elementIndex = tableData?.data?.findIndex(
    obj => obj?.studentData?._id === record?.data?._id
  );

  const data = tableData?.data;
  data[elementIndex]["studentData"] = record?.data;

  settableData(prevData => {
    return { ...prevData, data };
  });
};

export const deleteStudentData = async param => {
  try {
    const data = await post(
      `${process.env.REACT_APP_API_URL}/api/v1/students/delete-student`,
      param
    );

    return data;
  } catch (err) {
    if (err?.response?.data?.message) return err?.response?.data?.message;
    else return err;
  }
};

export const deleteStudentAction = (_id, tableData, settableData, filters) => {
  const filteredData = tableData?.data?.filter(
    obj => obj?.studentData?._id !== _id
  );

  settableData(prevData => {
    return { ...prevData, data: filteredData };
  });
};

export const payStudentFeeReq = async param => {
  try {
    const data = await post(
      `${process.env.REACT_APP_API_URL}/api/v1/students/pay-fee`,
      param
    );

    return data;
  } catch (err) {
    if (err?.response?.data?.message) return err?.response?.data?.message;
    else return err;
  }
};

export const payStudentAction = (record, tableData, settableData, filters) => {
  const elementIndex = tableData?.data?.findIndex(
    obj => obj?.studentData?._id === record?.data?._id
  );

  const data = tableData?.data;
  data[elementIndex]["studentData"] = record?.data;

  settableData(prevData => {
    return { ...prevData, data };
  });
};
