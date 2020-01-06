import React, { Component } from "react";
import style from "./style.less";
import { Button, Select } from "antd";
import SuperFormTable from "@/components/SuperFormTable";
import { connect } from "dva";
import { test_list } from "@/services/test";
const { Option } = Select;
@connect(state => state)
class TestList extends Component {
  state = {
    examList: []
  };
  componentDidMount() {
    test_list().then(res => {
      this.setState({
        examList: res.exam
      });
    });
  }
  handleFilterClick = values => {
    const { subject_id } = values;
    test_list({ subject_id }).then(res => {
      this.setState({
        examList: res.exam
      });
    });
  };
  goEdit(id) {
    localStorage.setItem("editingQuestionId", id);
    this.props.history.push({ pathname: "/question/edit", state: { id } });
  }
  getTestTime(stime, etime) {
    const times = (etime - stime) / 1000; //总共多少s
    const seconds = Math.floor(times % 60); //s
    const minutes = Math.floor((times / 60) % 60); //m
    const hours = Math.floor((times / 60 / 60) % 24); //h
    return `${hours}:${minutes}:${seconds}`;
  }
  get renderForm() {
    const { examType, subjectType } = this.props.question;
    const formConfig = [
      {
        label: "考试类型",
        name: "exam_id",
        content: (
          <Select>
            {examType.map(item => (
              <Option value={item.exam_id} key={item.exam_id}>
                {item.exam_name}
              </Option>
            ))}
          </Select>
        )
      },
      {
        label: "课程",
        name: "subject_id",
        content: (
          <Select>
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
        查询
      </Button>
    ];
    return {
      items: formConfig,
      onSubmit: this.handleFilterClick,
      buttons,
      resetBtn: true
    };
  }
  get renderTable() {
    const columns = [
      {
        title: "试卷信息",
        key: "info",
        render: (text, record) => {
          const timeLong = this.getTestTime(record.start_time, record.end_time);
          return (
            <>
              <p>{record.title}</p>
              <span>考试时间：{timeLong} </span>
              <span>{record.number}道题</span>
              <span>作弊0分</span>
            </>
          );
        }
      },
      {
        title: "班级",
        key: "grade",
        render: (text, record) => {
          return (
            <>
              <p>考试班级</p>
              {record.grade_name.map(item => item + " ")}
            </>
          );
        }
      },
      {
        title: "创建人",
        dataIndex: "user_name",
        key: "user_name"
      },
      {
        title: "开始时间",
        key: "start_time",
        render: (text, record) => {
          const time = new Date(record.start_time * 1).toLocaleString(
            "chinese",
            { hour12: false }
          );
          return time;
        }
      },
      {
        title: "结束时间",
        key: "end_time",
        render: (text, record) => {
          const time = new Date(record.end_time * 1).toLocaleString("chinese", {
            hour12: false
          });
          return time;
        }
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span
            onClick={() => {
              localStorage.setItem("testDetailId", record.exam_exam_id);
              this.props.history.push({
                pathname: "/test/detail",
                query: { id: record.exam_exam_id }
              });
            }}
          >
            <a>详情</a>
          </span>
        )
      }
    ];

    const data = this.state.examList;
    const buttons = [
      <span style={{ float: "left" }}>试卷列表</span>,
      <Button>全部</Button>,
      <Button>进行中</Button>,
      <Button>已结束</Button>
    ];
    return {
      dataSource: data,
      columns,
      buttons,
      rowKey: "exam_exam_id"
    };
  }
  render() {
    return (
      <div className={style.testList}>
        <SuperFormTable
          renderForm={this.renderForm}
          renderTable={this.renderTable}
        ></SuperFormTable>
      </div>
    );
  }
}

export default connect(state => state)(TestList);
