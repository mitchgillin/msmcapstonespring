import React from "react";
import App from "./App.js"
import MyHeader from "./MyHeader"
import { Form, Input, Button, Radio, Table, Icon, Divider } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const dataSource = [{
  key: '1',
  name: 'Mike',
  age: 32,
  address: '10 Downing Street'
}, {
  key: '2',
  name: 'John',
  age: 42,
  address: '10 Downing Street'
}];

const columns = [{
  title: 'Treatment',
  dataIndex: 'treatment',
  key: 'treatment',
}, {
  title: 'Taken',
  dataIndex: 'taken',
  key: 'taken',
}];



export default class DataInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      medications: []
      , taken: [],
      newMed: "",
      takenValue: null
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var newMedications = this.state.medications.slice();
    newMedications.push(this.state.newMed);
    var newTaken = this.state.taken.slice();
    newTaken.push(this.state.takenValue);
    this.setState({
      medications: newMedications,
      taken: newTaken
    })
  }

  handleChange = (e) => {
    this.setState({ newMed: e.target.value })
  }


  handleRadioChange = (e) => {
    console.log(e.target.value);
    this.setState({ takenValue: e.target.value })
  }

  render() {
    return (
      <div>
        <MyHeader />
        <div className="Input Field">
          {this.state.medications}
          <p> {this.state.taken.toString()} </p>
          <Form layout="inline" onSubmit={(e) => this.handleSubmit(e)}>
            <FormItem>
              <Input placeholder="Medicaiton" onChange={this.handleChange} />
            </FormItem>
            <FormItem>
              <RadioGroup onChange={(e) => this.handleRadioChange(e)} >
                <Radio value={true} > I have taken this today </Radio>
                <Radio value={false} > I haven't taken this today </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem>
              <Button type="primary"
                htmlType="submit" >
                Add medications
              </Button>
            </FormItem>
          </Form>


        </div>
        <Table dataSource={dataSource} columns={columns} />

      </div>
    )
  }

}