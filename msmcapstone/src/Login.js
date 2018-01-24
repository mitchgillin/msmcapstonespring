import React from "react";
import MyHeader from "./MyHeader.js"
import { Form, Icon, Input, Button } from 'antd';
import { Link } from 'react-router-dom'
import firebase, { auth, provider } from './firebase.js';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class Login extends React.Component {


  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      users: [],
    }
  }

  componentDidMount() {
    this.props.form.validateFields();
    const usersRef = firebase.database().ref("users");
    usersRef.on("value", (snapshot) => {
      let users = snapshot.val();
      let newState = [];
      for (let user in users) {
        newState.push({
          id: user,
          title: users[user].title,
          user: users[user].user
        });
      }
      this.setState({
        items: newState
      });
    });
    console.log(this.state)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const usersRef = firebase.database().ref("users");
        const user = {
          username: this.state.username,
          password: this.state.password
        }
        usersRef.push(user);
        this.setState({
          username: "",
          password: ""
        })
      }
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
      <div>
        <MyHeader />
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem
            validateStatus={userNameError ? 'error' : ''}
            help={userNameError || ''}
          >
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input onChange={this.handleChange} name="username" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
          </FormItem>
          <FormItem
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input onChange={this.handleChange} name="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Log in
          </Button>
            Or <Link to="/register"> Register Now! </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Login)
