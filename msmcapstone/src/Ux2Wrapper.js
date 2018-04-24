import React from "react"
import Ux2 from "/Users/mitchellgillin/Desktop/msmcapstonespring/msmcapstone/src/Ux2.js"
import MyHeader from "./MyHeader.js";

export default class UX2Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //{name,dailyDose,completed}
      ux2array: [{ name: "advil", dailyDose: 4, completed: false }, { name: "Vicodin", dailyDose: 2, completed: false }]
    }
  }


  render() {
    return (
      <div>
        <MyHeader />
        {this.state.ux2array.map((treatment) =>
          <Ux2
            name={treatment.name}
            dailyDose={treatment.dailyDose}
            completed={treatment.completed} />)}

      </div>
    )
  }
}