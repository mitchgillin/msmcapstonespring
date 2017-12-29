import React from "react";
import MyHeader from "./MyHeader.js"
import { Card } from "antd";

function About(props) {
  return (
    <div>
      <div>
        <MyHeader />
      </div>
      <Card title="Mitchell Gillin, CEO"> Mitchell is a 4th year BME who loves React.js and Human-Centered Design </Card>
      <Card title="Matthew Zetkulic, CTO"> Matt is a 4th year BME who loves React.js and Human-Centered Design </Card>
      <Card title="Sean Rouffa, CFO"> Sean is a 4th year BME who loves React.js and Human-Centered Design </Card>

    </div>
  );
}

export default About;