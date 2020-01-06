import React, { Component } from "react";
import style from "./style.less";
import { Button, Select, Tag } from "antd";
import SuperFormTable from "@/components/SuperFormTable";
import { connect } from "dva";
import SortBar from "./components/sortBar";
const { Option } = Select;

class List extends Component {
  state = {};
  handleFilterClick = values => {
    const { interviewType } = values;
    const params = {
      interviews_type_id: interviewType
    };
    const payload = {};
    for (let key in params) {
      if (params[key]) {
        payload[key] = params[key];
      }
    }
    this.props.dispatch({
      type: "interview/condition_interviews",
      payload
    });
  };
  goEdit(id) {
    this.props.history.push({ pathname: "/interview/edit", state: { id } });
  }
  get renderForm() {
    const { examType, interviewType } = this.props.interview;
    const formConfig = [
      {
        label: "题目类型",
        name: "interviewType",
        content: (
          <Select>
            {interviewType.map(item => (
              <Option
                value={item.interviews_type_id}
                key={item.interviews_type_id}
              >
                {item.interviews_type_text}
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
    const { interviewList } = this.props.interview;
    const columns = [
      {
        dataIndex: "title",
        key: "title",
        render: (text, record) => (
          <div>
            <a>{text}</a>
            <div className={style.tags}>
              {record.tags.map(tag => (
                <Tag color={tag.color} key={record.interview_id}>
                  {tag.text}
                </Tag>
              ))}
            </div>
            <span>{record.user_name} 发布</span>
          </div>
        )
      },
      {
        key: "action",
        fixed: "right",
        render: (text, record) => (
          <span onClick={this.goEdit.bind(this, record.interviews_id)}>
            <a>编辑</a>
          </span>
        )
      }
    ];

    const data = interviewList.map(item => {
      item.tags = [{ text: item.interviews_type_text, color: "blue" }];
      return item;
    });
    return {
      showHeader: false,
      dataSource: data,
      columns
    };
  }
  render() {
    return (
      <div className={style.queList}>
        <SuperFormTable
          renderForm={this.renderForm}
          renderTable={this.renderTable}
        ></SuperFormTable>
      </div>
    );
  }
}

export default connect(state => state)(List);
