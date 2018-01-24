import React from "react";
import MyHeader from "./MyHeader"
import firebase from "./firebase.js"
export default class FirebaseTest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    }

  }

  componentDidMount() {
    const usersRef = firebase.database().ref("users");
    let newState = [];
    usersRef.on("value", (snapshot) => {
      let users = snapshot.val();
      for (let user in users) {
        newState.push({
          user: users[user].username
        });
      }
      this.setState({
        users: newState
      })
    });

  }

  render() {
    return (
      <div>
        <MyHeader />
        <h1>
          FirebaseTest
        </h1>
        <ul>
          {this.state.users.map((user) => {
            return (
              <li key={user.user}>
                <h3>{user.password}</h3>
                <p>{user.user}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}