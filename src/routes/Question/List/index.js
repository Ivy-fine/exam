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
    const { questionType, examType } = values;
    const subject_id = this.checkedSubjectId;
    const params = {
      questions_type_id: questionType,
      subject_id,
      exam_id: examType
    };
    const payload = {};
    for (let key in params) {
      if (params[key]) {
        payload[key] = params[key];
      }
    }
    this.props.dispatch({
      type: "question/condition_questions",
      payload
    });
  };
  goEdit(id) {
    this.props.history.push({ pathname: "/question/edit", state: { id } });
  }
  goDetail(id) {
    localStorage.setItem("detailQuestionId", id);
    this.props.history.push({ pathname: "/question/detail", state: { id } });
  }
  get checkedSubjectId() {
    const { subjectType } = this.props.question;
    let id = "";
    subjectType.forEach(item => {
      if (item.checked) {
        id = item.subject_id;
      }
    });
    return id;
  }
  get renderForm() {
    const { examType, questionType } = this.props.question;
    const formConfig = [
      {
        label: "考试类型",
        name: "examType",
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
        label: "题目类型",
        name: "questionType",
        content: (
          <Select>
            {questionType.map(item => (
              <Option
                value={item.questions_type_id}
                key={item.questions_type_id}
              >
                {item.questions_type_text}
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
    const { questionList } = this.props.question;
    const columns = [
      {
        dataIndex: "title",
        key: "title",
        render: (text, record) => (
          <div onClick={this.goDetail.bind(this, record.questions_id)}>
            <a>{text}</a>
            <div className={style.tags}>
              {record.tags.map((tag, index) => (
                <Tag color={tag.color} key={index}>
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
          <span onClick={this.goEdit.bind(this, record.questions_id)}>
            <a>编辑</a>
          </span>
        )
      }
    ];

    const data = questionList
      ? questionList.map(item => {
          item.tags = [
            { text: item.questions_type_text, color: "blue" },
            { text: item.subject_text, color: "geekblue" },
            { text: item.exam_name, color: "orange" }
          ];
          item.key = item.questions_id;
          return item;
        })
      : [];
    return {
      showHeader: false,
      dataSource: data,
      columns
    };
  }
  render() {
    const { subjectType } = this.props.question;
    return (
      <div className={style.queList}>
        <SuperFormTable
          renderForm={this.renderForm}
          renderTable={this.renderTable}
        >
          <SortBar subjectType={subjectType} />
        </SuperFormTable>
      </div>
    );
  }
}

export default connect(state => state)(List);
