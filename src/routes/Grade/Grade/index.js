import React, { Component } from "react";
import SuperFormTable from "@/components/SuperFormTable";
import SuperForm from "@/components/SuperForm";
import { Button, Modal, Input, Select } from "antd";
import { connect } from "dva";
const { Option } = Select;

class Grade extends Component {
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = values => {
    this.props.dispatch({
      type: "class/addGrade",
      payload: values
    });
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  deleteGrade = id => {
    this.props.dispatch({
      type: "class/delGrade",
      payload: {
        grade_id: id
      }
    });
  };
  get renderForm() {
    const formConfig = [];
    const buttons = [
      <Button type="primary" htmlType="submit">
        添加班级
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
    const { classroom, subjectType } = this.props.class;
    const formConfig = [
      {
        label: "班级名",
        name: "grade_name",
        fieldOptions: {
          rules: [{ required: true, message: "请输入班级名" }]
        },
        content: <Input placeholder="请输入班级名" />
      },
      {
        label: "教室号",
        name: "room_id",
        content: (
          <Select placeholder="选择教室号">
            {classroom.map(item => (
              <Option value={item.room_id} key={item.room_id}>
                {item.room_text}
              </Option>
            ))}
          </Select>
        )
      },
      {
        label: "课程名",
        name: "subject_id",
        content: (
          <Select placeholder="选择课程名">
            {subjectType.map(item => (
              <Option value={item.subject_id} key={item.subject_id}>
                {item.subject_text}
              </Option>
            ))}
          </Select>
        )
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
    const { grade } = this.props.class;
    const columns = [
      {
        dataIndex: "grade_name",
        key: "grade_name",
        title: "班级名"
      },
      {
        dataIndex: "subject_text",
        key: "subject_text",
        title: "课程名"
      },
      {
        dataIndex: "room_text",
        key: "room_text",
        title: "教室号"
      },
      {
        key: "grade_id",
        title: "操作",
        render: (text, record) => (
          <span
            onClick={() => {
              this.deleteGrade(record.grade_id);
            }}
          >
            <a>删除</a>
          </span>
        )
      }
    ];

    const data = grade;
    return {
      dataSource: data,
      columns,
      rowKey: "grade_id"
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
            title="添加班级"
            visible={this.state.visible}
            onCancel={this.handleCancel}
            footer={null}
          >
            <SuperForm {...this.addForm} />
          </Modal>
        </SuperFormTable>
      </div>
    );
  }
}

export default connect(state => state)(Grade);
