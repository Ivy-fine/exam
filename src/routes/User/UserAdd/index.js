import React, { Component } from "react";
import { Button, Input, Select } from "antd";
import { connect } from "dva";
import SuperForm from "@/components/SuperForm";
const { Option } = Select;
class UserAdd extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "users/identity_list" });
  }
  handleSubmit = value => {
    this.props.dispatch({ type: "users/addUser_list", value });
  };
  get renderForm() {
    const { data } = this.props;
    const formConfig = [
      {
        name: "user_name",
        content: (
          <Input
            placeholder="请输入用户名"
            type="text"
            style={{ width: "500px" }}
          />
        )
      },
      {
        name: "user_pwd",
        content: (
          <Input
            placeholder="请输入密码"
            type="password"
            style={{ width: "500px" }}
          />
        )
      },
      {
        name: "identity_id",
        content: (
          <Select placeholder="请选择身份id" style={{ width: "500px" }}>
            {data &&
              data.map((item, index) => (
                <Option value={item.identity_id} key={index}>
                  {item.identity_text}
                </Option>
              ))}
          </Select>
        )
      }
    ];
    const buttons = [
      <Button type="primary" htmlType="submit">
        确定
      </Button>
    ];
    return {
      items: formConfig,
      onSubmit: this.handleFilterClick,
      buttons,
      resetBtn: true
    };
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    };
    const colSpan = 24;
    return (
      <div style={{ margin: "0 auto", width: "500px" }}>
        <SuperForm
          {...this.renderForm}
          formItemLayout={formItemLayout}
          colSpan={colSpan}
          onSubmit={this.handleSubmit}
          rowKey="user_id"
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    data: state.users.data
  };
}
export default connect(mapStateToProps)(UserAdd);
