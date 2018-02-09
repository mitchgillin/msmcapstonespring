import React from "react";
import MyHeader from "./MyHeader";
import { Form, Input, Button, Radio, Table } from 'antd';
import firebase, { auth } from './Firebase.js';
import TreatmentButtonList from "./TreatmentButtonList.js";

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

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

export default class DataInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      medications: []
      , taken: [],
      newMed: "",
      takenValue: "",
      user: null
    };
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
      key: this.state.newMed + Math.floor(Math.random() * 1000),
      date: now.toDateString()
    });
    this.setState({
      dataList: newDataList
    });
    const usersRef = firebase.database().ref(this.state.user.displayName);
    var firebaseData = [];
    usersRef.on("value", (snapshot) => {
      if ((snapshot.val()) != null) {
        // console.log("Snapshot.val()", snapshot.val())
      }
    }
    )
    firebaseData.push({
      name: this.state.newMed,
      taken: this.state.takenValue,
      key: Math.random() * 100000,
      date: now.toDateString()
    })
    // console.log(firebaseData);
    usersRef.child('treatments').push({
      // treatment: firebaseData
      name: this.state.newMed,
      taken: this.state.takenValue,
      key: Math.random() * 100000,
      date: now.toDateString()
    });
    document.getElementById("myForm").reset();
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
          console.log(tempDataList);

        });
      }
    });
    this.setState({
      dataList: tempDataList
    })

  }




  render() {
    return (
      <div>
        <MyHeader />
        <div className="Input Field">
          <Form layout="inline" onSubmit={(e) => this.handleSubmit(e)} id="myForm">
            <FormItem>
              <Input name="newMed" placeholder="Medicaiton" onChange={this.handleChange} />
            </FormItem>
            <FormItem>
              <RadioGroup name="takenValue" onChange={(e) => this.handleChange(e)} >
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

          <div>
            <TreatmentButtonList />
          </div>
        </div>
        {this.state.dataList.name}
        <Table dataSource={this.state.dataList} columns={columns} />
      </div>
    );
  }

}
