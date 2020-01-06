import React, { Component } from "react";
import style from "./index.less";
import LoginForm from "./components/LoginForm";
class Login extends Component {
  state = {};
  render() {
    return (
      <div className={style.login}>
        <div className={style.loginContent}>
          <h2>登录</h2>
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default Login;
