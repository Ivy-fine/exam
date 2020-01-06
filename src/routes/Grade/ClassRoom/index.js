import React, { Component } from "react";
import SuperFormTable from "@/components/SuperFormTable";
import SuperForm from "@/components/SuperForm";
import { Button, Modal, Input } from "antd";
import { connect } from "dva";

class ClassRoom extends Component {
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = values => {
    this.props.dispatch({
      type: "class/addClass",
      payload: values
    });
    this.setState({
      visible: false
    });
  };

  handleCancel = values => {
    this.setState({
      visible: false
    });
  };

  deleteClass = id => {
    this.props.dispatch({
      type: "class/delClass",
      payload: {
        room_id: id
      }
    });
  };
  get renderForm() {
    const formConfig = [];
    const buttons = [
      <Button type="primary" htmlType="submit">
        添加教室
      </Button>
    ];
    return {
      items: formConfig,
      buttons,
      onSubmit: this.showModal,
      resetBtn: false
    };
  }
  get addForm() {
    const formConfig = [
      {
        label: "教室号",
        name: "room_text",
        fieldOptions: {
          rules: [{ required: true, message: "请输入教室号" }]
        },
        content: <Input placeholder="请输入教室号" />
      }
    ];
    const buttons = [
      <Button type="primary" htmlType="submit">
        确定
      </Button>,
      <Button type="primary" htmlType="button" onClick={this.handleCancel}>
        取消
      </Button>
    ];
    return {
      items: formConfig,
      buttons,
      onSubmit: this.handleOk,
      resetBtn: false,
      colSpan: 24,
      colAlign: "center"
    };
  }
  get renderTable() {
    const { classroom } = this.props.class;
    const columns = [
      {
        dataIndex: "room_text",
        key: "room_text",
        title: "教室名"
      },
      {
        key: "room_id",
        title: "操作",
        render: (text, record) => (
          <span
            onClick={() => {
              this.deleteClass(record.room_id);
            }}
          >
            <a>删除</a>
          </span>
        )
      }
    ];

    const data = classroom;
    return {
      dataSource: data,
      columns,
      rowKey: "room_id"
    };
  }
  render() {
    return (
      <div>
        <SuperFormTable
          renderForm={this.renderForm}
          renderTable={this.renderTable}
        >
          <Modal
            title="添加教室"
            visible={this.state.visible}
            footer={null}
            onCancel={this.handleCancel}
          >
            <SuperForm {...this.addForm} />
          </Modal>
        </SuperFormTable>
      </div>
    );
  }
}

export default connect(state => state)(ClassRoom);
