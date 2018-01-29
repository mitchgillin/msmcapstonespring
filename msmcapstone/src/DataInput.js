import React from "react";
import MyHeader from "./MyHeader"
import { Form, Input, Button, Radio, Table } from 'antd';
import firebase, { auth } from './Firebase.js';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;


const columns = [{
  title: 'Medications',
  dataIndex: 'medications',
  key: 'medications',
}, {
  title: 'Taken',
  dataIndex: 'hasTaken',
  key: 'hasTaken',
  filters: [
    { text: 'Taken', value: "yes" },
    { text: 'Not Taken', value: "no" },
  ],
}];

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
    const usersRef = firebase.database().ref(this.state.user.displayName);
    usersRef.push().set({
      treatment: {
        name: this.state.newMed,
        taken: this.state.takenValue,
        key: Math.random() * 100000
      }
    });

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
        const usersRef = firebase.database().ref(this.state.user.displayName).child("-L3yaAhhADI2FSv82r8r")
        usersRef.on("value", (snapshot) => {
          console.log(snapshot.val())
          // console.log(snapshotToArray(snapshot))

          var tempSnap = snapshot.val();
          var tempArray = [];
          for (var treatment in tempSnap) {
            let tempshit = snapshot.child("treatment").val;
            tempArray.push(tempshit)
            console.log(tempshit)
          }
          this.setState({ dataList: tempArray })
          console.log(tempArray);

        })
      }
      else { this.setState({ dataList: [] }) }
    })


  }




  render() {




    return (
      <div>
        <MyHeader />
        <div className="Input Field">
          <Form layout="inline" onSubmit={(e) => this.handleSubmit(e)}>
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


        </div>
        <Table dataSource={this.state.dataList} columns={columns} />

      </div>
    )
  }

}