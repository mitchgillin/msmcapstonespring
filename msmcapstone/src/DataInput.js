import React from "react";
import MyHeader from "./MyHeader";
import { Form, Input, Button, Radio, Table } from 'antd';
import firebase, { auth } from './Firebase.js';
import TreatmentButtonList from "./TreatmentButtonList.js";
import MyFooter from "./MyFooter"
import "./"

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const now = new Date();

const columns = [{
  title: 'Medications',
  dataIndex: 'name',
  key: 'name'
}, {
  title: 'Taken',
  dataIndex: 'taken',
  key: 'taken'
},
{
  title: "Date",
  dataIndex: "date",
  key: "date"
}
];

export default class DataInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      medications: [],
      taken: [],
      newMed: "",
      takenValue: "",
      user: null
    };




  }





  handleSubmitTreatment = (e) => {
    e.preventDefault();
    var newMedications = this.state.medications.slice();
    newMedications.push(this.state.newMed);
    var newTaken = this.state.taken.slice();
    newTaken.push(this.state.takenValue);
    var newDataList = this.state.dataList.slice();
    newDataList.push({
      medications: this.state.newMed,
      hasTaken: this.state.takenValue,
      key: this.state.newMed + Math.floor(Math.random() * 1000),
      date: now.toDateString()
    });
    this.setState({
      dataList: newDataList
    });
    const usersRef = firebase.database().ref(this.state.user.displayName);
    usersRef.on("value", (snapshot) => {
      if ((snapshot.val()) != null) {
      }
    }
    )
    usersRef.child('treatments').push({
      name: this.state.newMed,
      taken: this.state.takenValue,
      key: Math.random() * 100000,
      date: now.toDateString()
    });
    document.getElementById("myForm").reset();
  }



  handleQuickAdd = (name) => {
    const usersRef = firebase.database().ref(this.state.user.displayName);
    console.log(name);
    usersRef.child('treatments').push({
      name: name,
      taken: "yes",
      key: Math.random() * 100000,
      date: now.toDateString()
    });
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  componentDidMount() {
    var tempDataList = [];
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        const usersRef = firebase.database().ref(this.state.user.displayName + "/treatments");
        usersRef.on("value", (snapshot) => {
          if ((snapshot.val()) != null) {
            tempDataList = [];
            snapshot.forEach(function (childSnapshot) {
              // console.log(childSnapshot.val().name);
              tempDataList.push({
                name: childSnapshot.val().name,
                taken: childSnapshot.val().taken,
                date: childSnapshot.val().date,
                key: childSnapshot.val().key
              })
            })
          }
          this.setState({
            dataList: tempDataList
          })
          // console.log(tempDataList);
        });
      }
    });
    this.setState({
      dataList: tempDataList
    })
  }


  handleDelete = () => {
    console.log("Working");
    const treatmentRef = firebase.database().ref(this.state.user.displayName + "/treatments");
    treatmentRef.remove();

    window.location.reload()

  }


  render() {

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        console.log(this.state.dataList)



      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };




    return (
      <div>
        <MyHeader />
        <div className="InputField">
          <Form layout="inline" onSubmit={(e) => this.handleSubmitTreatment(e)} id="myForm">
            <FormItem >
              <Input name="newMed" placeholder="Treatment" onChange={this.handleChange} />
            </FormItem>
            <FormItem>
              <RadioGroup name="takenValue" onChange={(e) => this.handleChange(e)} >
                <Radio value={"yes"} > Taken </Radio>
                <Radio value={"no"} > Not Taken </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem>
              <Button type="primary"
                htmlType="submit" >
                Add medications
              </Button>
            </FormItem>
          </Form>

          <div>
            <TreatmentButtonList onClick={this.handleQuickAdd} />
          </div>
        </div>
        <Button type="danger" onClick={this.handleDelete} > Delete All Entries</Button>
        <Table rowSelection={rowSelection} dataSource={this.state.dataList} columns={columns} />
        <MyFooter />
      </div >
    );
  }

}
