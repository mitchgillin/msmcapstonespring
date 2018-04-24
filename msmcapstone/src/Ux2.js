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
      showSubIcon: false,
      showPlusIcon: false
    }
  }


  handleAdd = () => {
    if (this.state.takenDose < this.state.dailyDose) {
      this.setState({
        showPlusIcon: false,
        takenDose: this.state.takenDose + 1
      })
    }
    else {
      this.setState({
        showPlutIcon: true
      })
    }
  }

  handleSub = () => {
    if (this.state.takenDose > 0) {
      this.setState({
        showSubIcon: false,
        takenDose: this.state.takenDose - 1
      })
    }
    else {
      this.setState({
        showSubIcon: true
      })
    }
  }


  render() {
    return (
      <div className="app">
        <Card style={{ width: 500 }}>
          <div>
            <Button onClick={this.handleSub}><Icon type="minus" /></Button>
            <h1>{this.props.name} </h1> <h1>{this.props.dailyDose}</h1> <h1>{this.state.takenDose}</h1>
            <Button onClick={this.handleAdd}> <Icon type="plus" /> </Button>
            <Alert showIcon={this.state.showSubIcon} message="Error Text" />
          </div>
        </Card>
      </div >
    )
  }
}