import React, { Component } from "react";
import { Redirect } from "dva/router";
function Authority(OldComponent) {
  return class extends Component {
    state = { isLogin: localStorage.getItem("token") };
    render() {
      const { isLogin } = this.state;
      return isLogin ? (
        <OldComponent {...this.props} />
      ) : (
        <Redirect to="/login" />
      );
    }
  };
}

export default Authority;
