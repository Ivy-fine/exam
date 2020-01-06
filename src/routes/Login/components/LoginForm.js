import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { withRouter } from "dva/router";
import style from "../index.less";
import { connect } from "dva";

class LoginForm extends Component {
  state = {};
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;
        this.props
          .dispatch({
            type: "user/login",
            payload: { user_name: username, user_pwd: password }
          })
          .then(() => {
            this.props.history.push("/");
          });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className={style.login_form}>
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "请输入用户名" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="用户名"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "请输入密码" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="密码"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>记住我</Checkbox>)}
          <Button
            type="primary"
            htmlType="submit"
            className={style.login_form_button}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect()(
  withRouter(Form.create({ name: "normal_login" })(LoginForm))
);
