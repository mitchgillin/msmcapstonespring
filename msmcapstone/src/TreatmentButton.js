import React from "react";
import { Button } from "antd";

export default class TreatmentButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treatment: ""
    }
  }


  render() {
    return (
      <Button onClick={this.props.onClick}> {this.props.name} </Button>
    )
  }

}
