import React from "react"
import { VictoryPie, VictoryLabel } from "victory"


export default class MyPie extends React.Component {




  render() {
    return (
      <VictoryPie
        labelRadius={1}
        style={{
          data: {
            fillOpacity: 0.9, stroke: "black", strokeWidth: 3
          }, labels: { fill: "black", fontSize: 20, fontWeight: "bold" }, parent: { maxWidth: "30%" }
        }}
        labels={this.props.percentCompletion == 1 ? ["All Done!"] : [""]}
        colorScale={this.props.percentCompletion == 1 ? ["#a5ffab", "white"] : ["red", "white"]}
        data={[
          { x: null, y: this.props.percentCompletion },
          { x: null, y: 1 - this.props.percentCompletion }
        ]}
        innerRadius={100}
      />
    )
  }
}