
import React from "react";
import { Button } from "antd"
import { auth, provider } from './firebase.js';
export default class Logininout extends React.Component {



  constructor() {
    super();
    this.state = {
      user: null
    }
  }


  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
      }
    })
  }





  logout = () => {
    auth.signOut().then(() => { this.setState({ user: null }) })


  }

  login = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        })
      })
  }

  render() {



    return (
      <div>
        {this.state.user ?
          <Button onClick={this.logout}> Log Out </Button>
          :
          <div>
            <Button onClick={this.login}> Login </Button>
          </div>
        }
      </div>
    )
  }

}