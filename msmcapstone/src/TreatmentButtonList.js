import React from "react";
import TreatmentButton from "./TreatmentButton.js";
import { Input, Button } from "antd";
import firebase, { auth } from "./Firebase.js";

export default class TreatmentButtonList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      buttons: [],
      user: null
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });

      }
    })
  }


  handleButtonSubmit = (e) => {
    e.preventDefault();
    let newArray = this.state.buttons.slice();
    newArray.push(this.state.name);
    this.setState({
      buttons: newArray
    });
    console.log(this.state.user);
    const userRef = firebase.database().ref(this.state.user.displayName);
    userRef.push().set({
      buttons: newArray
    });
  }
  handleInputChange = (e) => {
    this.setState({
      name: e.target.value
    })
  };

  handleTreatmentClick = (button) => {
    console.log(button.displayName);
  }

  render() {
    const listItems = this.state.buttons.map((button) =>
      <TreatmentButton
        key={button}
        name={button}
        onClick={({ button }) => { this.handleTreatmentClick(button) }} />
    );
    return (

      <div>
        <Input onChange={this.handleInputChange} placeholder="Testing" style={{ width: "20%" }} />
        <Button onClick={this.handleButtonSubmit} > Create New QuickAdd </Button>
        <div className="TreatmentButtons">
          <ul> {listItems} </ul>
        </div>
      </div>
    );
  }
}
