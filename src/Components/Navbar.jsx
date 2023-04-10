import React, { Component } from "react";
import { Row, Col } from "antd";
export class Navbar extends Component {
  render() {
    return (
      <Row align="top" justify="center">
        <Col span={24}>Hospital Management System</Col>
      </Row>
    );
  }
}

export default Navbar;
