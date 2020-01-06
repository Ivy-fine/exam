import React, { Component } from "react";
import { Layout, Avatar, Menu, Dropdown } from "antd";
import styles from "./style.less";
import { connect } from "dva";
import { withRouter } from "dva/router";
const { Header } = Layout;

class AvatarHeader extends Component {
  state = {};
  handleExitClick = () => {
    localStorage.removeItem("token");
    this.props.history.push("/login");
  };
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.alipay.com/"
          >
            个人中心
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.taobao.com/"
          >
            我的班级
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.tmall.com/"
          >
            设置
          </a>
        </Menu.Item>
        <Menu.Item onClick={this.handleExitClick}>退出登录</Menu.Item>
      </Menu>
    );
    return (
      <Header className={styles.header}>
        <img src={require("@/assets/images/logo.gif")} alt="" />
        <Dropdown overlay={menu}>
          <span className="ant-dropdown-link">
            <Avatar icon="user" className={styles.avatar} />
            <span>{this.props.user.info.user_name}</span>
          </span>
        </Dropdown>
      </Header>
    );
  }
}

export default connect(state => state)(withRouter(AvatarHeader));
