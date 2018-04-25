import React, { Component } from "react";
import "./App.css"
import 'antd/dist/antd.css'
import { Alert, Icon, Card, Button } from "antd";

export default class Ux2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      takenDose: 0,
      dailyDose: this.props.dailyDose,
      isDone: false
    }
  }



  handleAdd = () => {
    if (this.state.takenDose < this.state.dailyDose) {
      this.setState({
        takenDose: this.state.takenDose + 1,
        isDone: false
      })
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
      if (this.state.takenDose < this.state.dailyDose + 1) {
        this.setState({
          isDone: false
        })
      }
    }
  }


  render() {
    const { Meta } = Card;

    return (
      <div className="app">
        <Card
          style={{ width: 300 }}
          bodyStyle={this.state.isDone ? { background: "#048e62" } : { background: "#ef8183" }}
          actions={[<Button onClick={this.handleSub}><Icon type="minus" /></Button>, <h1>Doses Taken: {this.state.takenDose}</h1>, <Button onClick={this.handleAdd}> <Icon type="plus" /> </Button>]}
        >
          <Meta
            title={this.props.name}
            description={'Daily Dose: ' + this.state.dailyDose}
          />
        </Card>
      </div >
    )
  }
}