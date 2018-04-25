import React from "react";
import { Row, Col, Button, Input, InputNumber } from "antd";

export default class Ux2Generator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drugName: "",
      drugDose: 0,
    }
  }

  updateState = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {

    return (
      <Row type="flex" align="middle" justify="center" style={{ padding: "20px" }}>
        <Col style={{ width: "30%", padding: "20px" }}>
          <Input name="drugName" size="large" placeholder="Drug Name" onChange={(e) => this.updateState(e)} />
          <Input name="drugDose" size="large" placeholder="Daily Drug Dose" onChange={(e) => this.updateState(e)} />
        </Col>
        <Button type="primary" style={{ background: "#a5ffab", color: "black" }} onClick={() => this.props.addDrugToArray({ name: this.state.drugName, dailyDose: this.state.drugDose, completed: false })}> Add New Treatment </Button>
      </Row >
    )
  }
}