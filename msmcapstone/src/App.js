import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Welcome from "./Welcome.js";
import About from "./About.js";
import Login from "./Login.js";
import DataInput from "./DataInput.js";
import DataVis from "./DataVis.js"

class App extends React.Component {

  render() {
    return (
      < div className="App" >
        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route exact path='/about' component={About} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/datainput' component={DataInput} />
          <Route exact path='/datavis' component={DataVis} />
        </Switch>
      </div >
    );
  }
}

export default App;
