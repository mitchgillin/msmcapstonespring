import React from "react";
import { Button } from "antd";
import { VictoryChart, VictoryAxis, VictoryTheme, VictoryLine, VictoryLabel, VictoryContainer } from 'victory';
import MyHeader from "./MyHeader.js"

const data = [{ patient: 1, adherance: .9 }, { patient: 2, adherance: .4 }];

export default class DataVis extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pNum: 0,
      data: [[{ x: "Su", y: .98 },
      { x: "M", y: 1 },
      { x: "T", y: .4 },
      { x: "W", y: .67 },
      { x: "Th", y: .75 },
      { x: "F", y: .88 },
      { x: "S", y: .85 }],

      [{ x: "Su", y: .5 },
      { x: "M", y: .77 },
      { x: "T", y: .88 },
      { x: "W", y: .53 },
      { x: "Th", y: .33 },
      { x: "F", y: .45 },
      { x: "S", y: .68 }],

      [{ x: "Su", y: .44 },
      { x: "M", y: .18 },
      { x: "T", y: .88 },
      { x: "W", y: .98 },
      { x: "Th", y: .75 },
      { x: "F", y: .30 },
      { x: "S", y: .67 }],

      [{ x: "Su", y: 1 },
      { x: "M", y: .75 },
      { x: "T", y: .66 },
      { x: "W", y: .50 },
      { x: "Th", y: .35 },
      { x: "F", y: .25 },
      { x: "S", y: .10 }]
      ]
    }
  }

  handleClick = () => {
    if (this.state.pNum > this.state.data.length - 2) {
      this.setState({
        pNum: 0
      })
    }
    else {
      this.setState({
        pNum: this.state.pNum + 1
      })
    }
  }

  render() {
    return (
      <div>
        <MyHeader />
        <h1>Patient ID: {this.state.pNum + 1} </h1>
        <Button onClick={this.handleClick}>Next Patient </Button>
        <VictoryChart theme={VictoryTheme.material} style={{ parent: { maxWidth: "40%" } }}
          padding={{ left: 50, top: 50, right: 50, bottom: 50 }} >
          <VictoryLabel text="Patient Treatment Adherance" x={180} y={30} textAnchor="middle" />
          <VictoryLine
            height="50%"
            data={this.state.data[this.state.pNum]}
            domain={{ y: [0, 1.1] }}

          />
        </VictoryChart>
      </div >
    )
  }


}