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
        var tempButtons = [];
        const usersRef = firebase.database().ref(this.state.user.displayName + "/buttons");
        usersRef.on("value", (snapshot) => {
          if ((snapshot.val()) != null) {
            tempButtons = [];
            snapshot.forEach(function (childSnapshot) {
              // console.log(childSnapshot.val().name);
              tempButtons.push({
                name: childSnapshot.val().name
              })
            })
          }
          this.setState({
            buttons: tempButtons
          })
          console.log(this.state.name);
        });

      }
    })
  }


  handleButtonSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.user);
    const userRef = firebase.database().ref(this.state.user.displayName);
    userRef.child('buttons').push({
      name: this.state.name
    });
  }
  handleInputChange = (e) => {
    this.setState({
      name: e.target.value
    })
  };

  handleTreatmentClick = (button) => {
    { this.props.onClick(button) }
  }

  render() {
    const listItems = this.state.buttons.map((button) =>
      <TreatmentButton
        key={Math.random() * 10000}
        name={button.name}
        onClick={() => this.handleTreatmentClick(button.name)} />
    );
    return (

      <div>
        <Input onChange={this.handleInputChange} style={{ width: "20%" }} />
        <Button onClick={this.handleButtonSubmit} > Create New QuickAdd </Button>
        <div className="TreatmentButtons">
          <ul > {listItems} </ul>
        </div>
      </div>
    );
  }
}
