import React, { Component } from "react";
import SuperTable from "@/components/SuperTable";
import Dialog from "@/components/Dialog";
import { connect } from "dva";
import { Input, Popconfirm } from "antd";
import style from "./style.less";
@connect(state => state)
class Classify extends Component {
  state = {
    newType: ""
  };
  handleOk = hide => {
    this.props.dispatch({
      type: "question/question_type_add",
      payload: {
        text: this.state.newType,
        sort: new Date() * 1 - 1575620870000
      }
    });
    hide();
  };
  handleChange = e => {
    this.setState({
      newType: e.target.value
    });
  };
  handleDelete = id => {
    this.props.dispatch({
      type: "question/question_type_del",
      payload: { id }
    });
  };
  get renderTable() {
    const columns = [
      {
        title: "类型ID",
        dataIndex: "questions_type_id",
        key: "questions_type_id"
      },
      {
        title: "类型名称",
        dataIndex: "questions_type_text",
        key: "questions_type_text"
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <Popconfirm
            title="确定删除吗？"
            okText="确认"
            cancelText="取消"
            onConfirm={this.handleDelete.bind(this, record.questions_type_id)}
          >
            <a>删除</a>
          </Popconfirm>
        )
      }
    ];

    const data = this.props.question.questionType.map(item => {
      item.key = item.questions_type_id;
      return item;
    });
    return {
      dataSource: data,
      columns
    };
  }
  get dialogOptions() {
    return {
      btnText: "+ 添加类型",
      title: "创建新类型",
      content: (
        <Input
          placeholder="请输入类型名称"
          onChange={this.handleChange}
          value={this.state.newType}
        />
      )
    };
  }
  render() {
    return (
      <div className={style.classify}>
        <Dialog {...this.dialogOptions} onOk={this.handleOk} />
        <SuperTable {...this.renderTable} className={style.typeForm} />
      </div>
    );
  }
}

export default Classify;
