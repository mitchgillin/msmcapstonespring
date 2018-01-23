import React from "react";
import App from "./App.js"
import MyHeader from "./MyHeader"
import { Form, Input, Button, Radio, Table, Icon, Divider } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;


const columns = [{
  title: 'Treatment',
  dataIndex: 'medications',
  key: 'medications',
}, {
  title: 'Taken',
  dataIndex: 'hasTaken',
  key: 'hasTaken',
}];



export default class DataInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      medications: []
      , taken: [],
      newMed: "",
      takenValue: ""
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var newMedications = this.state.medications.slice();
    newMedications.push(this.state.newMed);
    var newTaken = this.state.taken.slice();
    newTaken.push(this.state.takenValue);
    var newDataList = this.state.dataList.slice();
    newDataList.push({
      medications: this.state.newMed,
      hasTaken: this.state.takenValue,
      key: this.state.newMed + Math.floor(Math.random() * 1000)
    });
    this.setState({
      medications: newMedications,
      taken: newTaken,
      dataList: newDataList
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
          <Form layout="inline" onSubmit={(e) => this.handleSubmit(e)}>
            <FormItem>
              <Input placeholder="Medicaiton" onChange={this.handleChange} />
            </FormItem>
            <FormItem>
              <RadioGroup onChange={(e) => this.handleRadioChange(e)} >
                <Radio value={"yes"} > I have taken this today </Radio>
                <Radio value={"no"} > I haven't taken this today </Radio>
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
        <Table dataSource={this.state.dataList} columns={columns} />

      </div>
    )
  }

}