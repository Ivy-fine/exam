import React, { Component } from "react";
import { Button, Select, Input } from "antd";
import SuperFormTable from "@/components/SuperFormTable";
import { connect } from "dva";
const { Option } = Select;
class Student extends Component {
  state = {};
  handleFilterClick(values) {
    console.log(values);
  }
  deleteStudent = id => {
    this.props.dispatch({
      type: "class/delStudent",
      payload: {
        id: id
      }
    });
  };
  get renderForm() {
    const { grade, classroom } = this.props.class;

    const formConfig = [
      {
        name: "student_text",
        content: <Input placeholder="输入学生姓名" />
      },
      {
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
        name: "grade_id",
        content: (
          <Select placeholder="选择班级名">
            {grade.map(item => (
              <Option value={item.grade_id} key={item.grade_id}>
                {item.grade_name}
              </Option>
            ))}
          </Select>
        )
      }
    ];
    const buttons = [
      <Button type="primary" htmlType="submit">
        查询
      </Button>
    ];
    return {
      items: formConfig,
      buttons,
      resetBtn: true,
      onSubmit: this.handleFilterClick
    };
  }
  get renderTable() {
    const { students } = this.props.class;
    const columns = [
      {
        dataIndex: "student_name",
        key: "student_name",
        title: "姓名"
      },
      {
        dataIndex: "student_id",
        key: "student_id",
        title: "学号"
      },
      {
        dataIndex: "grade_name",
        key: "grade_name",
        title: "班级"
      },
      {
        dataIndex: "room_text",
        key: "room_text",
        title: "教室"
      },
      {
        dataIndex: "student_pwd",
        key: "student_pwd",
        title: "密码"
      },
      {
        key: "action",
        render: (text, record) => (
          <span
            onClick={() => {
              this.deleteStudent(record.student_id);
            }}
          >
            <a>删除</a>
          </span>
        )
      }
    ];

    const data = students;
    return {
      showHeader: true,
      dataSource: data,
      columns,
      rowKey: "student_id"
    };
  }
  render() {
    return (
      <div>
        <SuperFormTable
          renderForm={this.renderForm}
          renderTable={this.renderTable}
        ></SuperFormTable>
      </div>
    );
  }
}

export default connect(state => state)(Student);
