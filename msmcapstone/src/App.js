import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Welcome from "./Welcome.js";
import About from "./About.js";
import Login from "./Login.js";
import Register from "./Register.js";
import { Form, Icon, Input, Button } from 'antd';


class App extends Component {
  render() {
    return (

      <div className="App">
        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route exact path='/about' component={About} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </Switch>
      </div>
    );
  }
}

export default App;
