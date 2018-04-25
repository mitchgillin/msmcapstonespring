import React from "react";
import { Menu } from 'antd';
import 'antd/dist/antd.css'
import { Link } from 'react-router-dom'
import Loginout from "./Loginout.js"
import { auth } from "./Firebase.js"




class MyHeader extends React.Component {
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

  render() {
    return (
      <div>
        <h1 style={{ display: "flex", textAlign: "center" }}> <Link to="./" >Perdix Medical </Link> </h1>
        <Menu
          theme="light"
          mode="horizontal"
          style={{ lineHeight: "48px", textAlign: "right" }}>
          <Menu.Item key="1" > <Link to="./about"> About </Link>  </Menu.Item>

          {this.state.user ? (
            < Menu.Item key="3" > <Link to="./datainput"> Data Input </Link> </Menu.Item>
          )
            : null}
          <Menu.Item key="5" > <Link to="./datavis" > Data Visualization </Link></Menu.Item>
          <Menu.Item key="6" > <Link to="./ux2" > UX2.0 </Link> </Menu.Item>
          <Menu.Item key="4" > <Loginout /> </Menu.Item>


        </Menu>
      </div >
    )
  }

}

export default MyHeader;