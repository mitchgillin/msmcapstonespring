import React from "react";
import { Button, Input, InputNumber } from "antd";

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
      <div>
        <Input name="drugName" size="large" placeholder="Drug Name" onChange={(e) => this.updateState(e)} />
        <Input name="drugDose" size="large" placeholder="Daily Drug Dose" onChange={(e) => this.updateState(e)} />
        <Button onClick={() => this.props.addDrugToArray({ name: this.state.drugName, dailyDose: this.state.drugDose, completed: false })}> Add New Treatment </Button>
      </div>
    )
  }
}