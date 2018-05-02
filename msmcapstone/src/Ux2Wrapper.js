import React from "react"
import Ux2 from "/Users/mitchellgillin/Desktop/msmcapstonespring/msmcapstone/src/Ux2.js"
import Ux2Generator from "./Ux2Generator.js"
import MyHeader from "./MyHeader.js";
import { Row, Col } from "antd"
import MyPie from "./MyPie"

export default class UX2Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //{name,dailyDose,completed}
      percentCompletion: 0,
      ux2array: [{ name: "Advil", dailyDose: 4, completedDose: 0 }, { name: "Vicodin", dailyDose: 2, completedDose: 0 }]
    }
  }

  addDrugToArray = (drugDetails) => {
    let ux2arrayTemp = this.state.ux2array.slice();
    ux2arrayTemp.push(drugDetails);
    this.setState({
      ux2array: ux2arrayTemp
    })
    this.calcPercentAdherance();

  }

  removeDrugFromArray = (drugName) => {
    let removedArray = this.state.ux2array.filter(function (el) {
      return el.name !== drugName;
    });
    this.setState({
      ux2array: removedArray
    })
    this.calcPercentAdherance();

  }

  updateCompletedDose = (drugName, dose) => {
    let tempArray = this.state.ux2array.slice();
    for (var i in tempArray) {
      if (tempArray[i].name == drugName) {
        tempArray[i].completedDose = dose;
        break;
      }
    }
    this.setState({
      ux2array: tempArray
    })
    this.calcPercentAdherance();
  }

  calcPercentAdherance = () => {
    let totalTreatmentDaily = 0;
    let takenDaily = 0;
    for (var i in this.state.ux2array) {
      totalTreatmentDaily += this.state.ux2array[i].dailyDose
      takenDaily += this.state.ux2array[i].completedDose
    }
    this.setState({
      percentCompletion: (takenDaily / totalTreatmentDaily)
    })
  }


  render() {
    return (
      <div >
        <MyHeader />
        <Row type="flex" align="center">
          <Ux2Generator addDrugToArray={(obj) => this.addDrugToArray(obj)} />
          <MyPie percentCompletion={this.state.percentCompletion} />
        </Row>

        <Row type="flex" justify="space-around" align="center">
          {this.state.ux2array.map((treatment) =>
            <Col >
              <Ux2
                key={treatment.name + treatment.dailyDose}
                name={treatment.name}
                dailyDose={treatment.dailyDose}
                completedDose={treatment.completedDose}
                removeDrugFromArray={this.removeDrugFromArray}
                updateCompletedDose={this.updateCompletedDose} />
            </Col>
          )}

        </Row>
      </div >
    )
  }
}