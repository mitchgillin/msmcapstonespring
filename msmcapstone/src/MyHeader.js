import React from "react";
import { Layout, Menu } from 'antd';
import { Icon } from 'antd';
import Welcome from "./Welcome.js"
import 'antd/dist/antd.css'
import {
  Link
} from 'react-router-dom'
const { Header } = Layout;

function MyHeader(props) {
  return (
    <div>
      <h1><Link to="/" component={Welcome}> Perdix Medical </Link> </h1>
      <Menu
        theme="light"
        mode="horizontal"
        style={{ lineHeight: "48px", textAlign: "right" }}>
        <Menu.Item key="1" > <Link to="./about"> About </Link>  </Menu.Item>
        <Menu.Item key="2" > <Link to="./login"> Login </Link> </Menu.Item>
      </Menu>
    </div>
  )
}

export default MyHeader;