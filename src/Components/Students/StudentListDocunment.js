import React, { useState } from "react";
import { Table } from "antd";

const StudentListDocunment = React.forwardRef((props, ref) => {
  const { data, columns } = props;

  console.log("Columns in document: ", columns);
  return (
    <div ref={ref}>
      <h1>Student Data</h1>
      <div>
        {columns?.length > 0 && (
          <Table
            rowKey={record => {
              return record?.studentData?._id;
            }}
            columns={columns}
            dataSource={data}
            size="middle"
            pagination={{ pageSize: 20 }}
            scroll={{
              y: "50vh"
            }}
          />
        )}
      </div>
    </div>
  );
});

export default StudentListDocunment;
