import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu, Icon } from "antd";
import { menusRoutes } from "@/router/routes";
import { withRouter } from "dva/router";
const { SubMenu } = Menu;
class Navigator extends Component {
  static propTypes = {
    handleClick: PropTypes.func
  };
  get_menus(routes) {
    let list = routes.filter(item => !item.redirect);
    list = list.filter(item => !item.meta.menuHide);
    return list.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.path}>
            <span>
              {item.meta.icon && <Icon type={item.meta.icon} />}
              <span>{item.meta.title}</span>
            </span>
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu
            key={item.path}
            title={
              <span>
                {item.meta.icon && <Icon type={item.meta.icon} />}
                <span>{item.meta.title}</span>
              </span>
            }
          >
            {this.get_menus(item.children)}
          </SubMenu>
        );
      }
    });
  }
  get defaultSelectedKeys() {
    return this.props.location.pathname;
  }
  get defaultOpenKeys() {
    return "/" + this.props.location.pathname.split("/")[1];
  }
  render() {
    const { handleClick } = this.props;
    return (
      <div>
        <Menu
          onClick={handleClick}
          style={{ width: 200, backgroundColor: "transparent", color: "#fff" }}
          mode="inline"
          theme="dark"
          defaultOpenKeys={[this.defaultOpenKeys]}
          defaultSelectedKeys={[this.defaultSelectedKeys]}
        >
          {this.get_menus(menusRoutes)}
        </Menu>
      </div>
    );
  }
}

export default withRouter(Navigator);
