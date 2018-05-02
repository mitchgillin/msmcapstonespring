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

  updateName = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  updateDose = (e) => {
    console.log(e);
    this.setState({
      drugDose: e
    })
  }

  render() {

    return (
      <Row type="flex" align="middle" justify="center" style={{ padding: "20px" }}>
        <Col style={{ width: "70%", padding: "20px" }}>
          <Input name="drugName" id="drugName" size="large" placeholder="Drug Name" onChange={(e) => this.updateName(e)} />
          <InputNumber min={0} name="drugDose" size="large" placeholder="Daily Dose" onChange={(e) => this.updateDose(e)} />
        </Col>
        <Button type="primary" style={{}} onClick={() => this.props.addDrugToArray({ name: this.state.drugName, dailyDose: this.state.drugDose, completed: false })}> Add New Treatment </Button>
      </Row >
    )
  }
}