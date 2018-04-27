import React, { Component } from "react";
import "./App.css"
import 'antd/dist/antd.css'
import { Row, Alert, Icon, Card, Button } from "antd";

export default class Ux2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      takenDose: 0,
      dailyDose: this.props.dailyDose,
      isDone: false
    }
  }

  componentDidMount = () => {
    if (this.state.takenDose === this.state.dailyDose) {
      this.setState({
        isDone: true
      })
    }


  }



  handleAdd = () => {
    if (this.state.takenDose < this.state.dailyDose) {
      this.setState({
        takenDose: this.state.takenDose + 1,
        isDone: false
      })
      this.props.updateCompletedDose(this.props.name, this.state.takenDose + 1);

    }
    if (this.state.takenDose == this.state.dailyDose - 1) {
      this.setState({
        isDone: true
      })
    }

  }

  handleSub = () => {
    if (this.state.takenDose > 0) {
      this.setState({
        showSubIcon: false,
        takenDose: this.state.takenDose - 1
      })
      this.props.updateCompletedDose(this.props.name, this.state.takenDose - 1);

    }
    if (this.state.takenDose < this.state.dailyDose + 1) {
      this.setState({
        isDone: false
      })
    }

  }


  render() {

    const { Meta } = Card;
    return (
      <div className="app">
        <Card
          style={{ width: 300, height: "200", borderRadius: "25px 25px 0px 0px" }}
          bodyStyle={this.state.isDone ? { background: "#a5ffab", borderRadius: "25px 25px 0px 0px" } : { background: "#ef8183", borderRadius: "25px 25px 0px 0px" }}
          actions={[<Button onClick={this.handleSub}><Icon type="minus" /></Button>, <h1>Doses Taken: {this.state.takenDose}</h1>, <Button onClick={this.handleAdd}> <Icon type="plus" /> </Button>]}
        >
          <Button type="danger" style={{ display: "flex", justifyContent: "flex-end" }} onClick={(name) => this.props.removeDrugFromArray(this.props.name)}> <Icon type="close" /> </Button>
          <Meta
            title={this.props.name}
            description={'Daily Dose: ' + this.state.dailyDose}
            style={{ color: "red", borderRadius: "0px 0px 25px 25px" }}

          />
        </Card>
      </div >
    )
  }
}