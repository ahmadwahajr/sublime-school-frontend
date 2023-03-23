import React, { useState, useRef } from "react";
import { Table, Input, Button, Space, Checkbox, Dropdown } from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { items } from "./tableConstants";

export default function TableComp({
  data,
  loading = true,
  paginationSize = 20,
  handleChangeAction,
}) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex[0]][dataIndex[1]]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Roll No",
      dataIndex: ["studentData", "rollNo"],
      ...getColumnSearchProps(["studentData", "rollNo"]),
    },
    {
      title: "Name",
      dataIndex: ["studentData", "name"],
      ...getColumnSearchProps(["studentData", "name"]),
    },
    {
      title: "Father Name",
      dataIndex: ["studentData", "fatherName"],
      ...getColumnSearchProps(["studentData", "fatherName"]),
    },
    {
      title: "Phone No",
      dataIndex: ["studentData", "phoneNo1"],
    },
    // {
    //   title: "Batch",
    //   dataIndex: ["studentData", "batch"]
    // },
    {
      title: "Fee Status",
      key: "fee_status",
      render: (_, record) => (
        <Space size="middle">
          <Checkbox
            checked={record?.feeDetails?.isPaid}
            //   onChange={e => onChangeFee(e, record)}
          />
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Dropdown
            menu={{
              items,
              onClick: (key) => handleChangeAction(key, record),
            }}
          >
            <a>
              Actions <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div>
        <Table
          rowKey={(record) => {
            return record?.studentData?._id;
          }}
          columns={columns}
          dataSource={data}
          size="middle"
          loading={loading}
          pagination={{ pageSize: `${paginationSize}` }}
          scroll={{
            y: "50vh",
          }}
        />
      </div>
      <div>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: "8px" }}
          // onClick={downloadChallan}
        >
          Print All Challan
        </Button>{" "}
      </div>
    </>
  );
}
