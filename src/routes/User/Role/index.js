import React, { Component } from "react";
import { Tabs, Menu, Checkbox, Input, Button, Modal } from "antd";
import SuperForm from "@/components/SuperForm";
import style from "./style.less";
import { connect } from "dva";
import { add_view_authority, setIdentityView } from "@/services/users";
const { TabPane } = Tabs;
@connect(state => state)
class Role extends Component {
  state = {
    selectedIdentity: this.props.users.identity[0]
      ? this.props.users.identity[0].identity_text
      : "",
    visible: false,
    confirmLoading: false
  };
  handleChange(key) {
    console.log(key);
  }
  handleClickMenu = e => {
    // console.log("click ", e);
    this.setState({
      selectedIdentity: this.props.users.identity[e.key].identity_text
    });
  };
  handleChangeCheckGroup = checkedValues => {
    const { options, defaultValue } = this.selectedIdentity_view_list;
    const { identity } = this.props.users;
    let res = "";
    checkedValues.forEach(item => {
      if (defaultValue.indexOf(item) === -1) {
        res = item;
      }
    });
    let view_authority_id = "";
    options.forEach(item => {
      if (item.value === res) {
        view_authority_id = item.view_authority_id;
      }
    });
    let identity_id = "";
    identity.forEach(item => {
      if (item.identity_text === this.state.selectedIdentity) {
        identity_id = item.identity_id;
      }
    });
    setIdentityView({ view_authority_id, identity_id }).then(res => {
      this.props.dispatch({ type: "users/identityViewAuthority_list" });
    });
  };
  handleOk = () => {
    this.hideModel();
  };
  handleDialogFilterClick = values => {
    // console.log(values);
    add_view_authority(values).then(res => {
      // console.log(res);
      this.hideModel();
    });
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  hideModel = () => {
    this.setState({
      visible: false,
      confirmLoading: false
    });
  };

  get selectedIdentity_view_list() {
    const { identityViewAuthority_list, viewAuthority_list } = this.props.users;
    const { selectedIdentity } = this.state;
    // console.log(viewAuthority_list);
    const list = identityViewAuthority_list.filter(
      item => item.identity_text === selectedIdentity
    );
    return {
      defaultValue: list.map(item => {
        return item.view_id;
      }),
      options: viewAuthority_list.map(item => {
        return {
          label: item.view_authority_text,
          value: item.view_id,
          view_authority_id: item.view_authority_id
        };
      })
    };
  }
  get dialogOptions() {
    return {
      items: [
        {
          label: "视图权限名称",
          name: "view_authority_text",
          fieldOptions: {
            rules: [{ required: true, message: "请输入视图权限名称" }]
          },
          content: <Input />,
          colSpan: 24
        },
        {
          label: "视图ID",
          name: "view_id",
          fieldOptions: {
            rules: [{ required: true, message: "请输入视图ID" }]
          },
          content: <Input />,
          colSpan: 24
        }
      ],
      formItemLayout: {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 }
      },
      resetBtn: false,
      onSubmit: this.handleDialogFilterClick,
      buttons: [
        <Button htmlType="submit" type="primary">
          提交
        </Button>,
        <Button>取消</Button>
      ]
    };
  }
  render() {
    const { identity } = this.props.users;
    const { options, defaultValue } = this.selectedIdentity_view_list;
    return (
      <div className={style.roleWrap}>
        <Menu
          onClick={this.handleClickMenu}
          style={{ width: 256 }}
          defaultSelectedKeys="0"
          mode="inline"
          className={style.menu}
        >
          {identity &&
            identity.map((item, index) => (
              <Menu.Item key={index}>
                <p>{item.identity_text}</p>
                <span>{item.identity_id}</span>
              </Menu.Item>
            ))}
        </Menu>
        <Tabs
          defaultActiveKey="1"
          onChange={this.handleChange}
          className={style.tabsWrap}
        >
          <TabPane tab="视图权限" key="1">
            {/* <SuperForm {...this.renderForm} /> */}
            <Checkbox.Group
              options={options}
              value={defaultValue}
              onChange={this.handleChangeCheckGroup}
            ></Checkbox.Group>
            <Button type="primary" onClick={this.showModal}>
              添加视图权限
            </Button>
            <Modal
              title="添加视图权限"
              visible={this.state.visible}
              confirmLoading={this.state.confirmLoading}
              onCancel={this.hideModel}
              footer={null}
            >
              <SuperForm {...this.dialogOptions} />
            </Modal>
          </TabPane>
          <TabPane tab="接口权限" key="2">
            接口权限
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Role;
