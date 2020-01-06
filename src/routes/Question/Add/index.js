import React, { Component } from "react";
import SuperForm from "@/components/SuperForm";
import { connect } from "dva";
import { Select, Button, Input, message } from "antd";
import { question_add } from "@/services/question";

const { Option } = Select;
const { TextArea } = Input;
@connect(state => state)
class Add extends Component {
  state = {};
  handleFilterClick = values => {
    console.log(values);
    const user_id = this.props.user.info.user_id;
    question_add({ ...values, user_id }).then(res => {
      message.success(res.msg);
      this.props.history.push("/question/list");
    });
  };
  render() {
    const { examType, questionType, subjectType } = this.props.question;
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    const formConfig = [
      {
        label: "题干",
        name: "questions_stem",
        fieldOptions: {
          rules: [{ required: true, message: "请输入题干信息" }]
        },
        content: <Input placeholder="请输入题目标题，不超过20个字" />
      },
      {
        label: "题目主题",
        name: "title",
        fieldOptions: {
          rules: [{ required: true, message: "请输入题目主题" }]
        },
        content: <TextArea rows={18} />
      },
      {
        label: "考试类型",
        name: "exam_id",
        fieldOptions: {
          rules: [{ required: true, message: "请选择考试类型" }]
        },
        content: (
          <Select style={{ width: "200px" }}>
            {examType.map(item => (
              <Option value={item.exam_id} key={item.exam_id}>
                {item.exam_name}
              </Option>
            ))}
          </Select>
        )
      },
      {
        label: "课程类型",
        name: "subject_id",
        fieldOptions: {
          rules: [{ required: true, message: "请选择课程类型" }]
        },
        content: (
          <Select style={{ width: "200px" }}>
            {subjectType.map(item => (
              <Option value={item.subject_id} key={item.subject_id}>
                {item.subject_text}
              </Option>
            ))}
          </Select>
        )
      },
      {
        label: "题目类型",
        name: "questions_type_id",
        fieldOptions: {
          rules: [{ required: true, message: "请选择题目类型" }]
        },
        content: (
          <Select style={{ width: "200px" }}>
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
      },
      {
        label: "答案信息",
        name: "questions_answer",
        fieldOptions: {
          rules: [{ required: true, message: "请输入答案信息" }]
        },
        content: <TextArea rows={18} />
      }
    ];
    const buttons = [
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    ];
    return (
      <div>
        <SuperForm
          items={formConfig}
          onSubmit={this.handleFilterClick}
          buttons={buttons}
          resetBtn={false}
          formItemLayout={formItemLayout}
          colSpan={24}
        />
      </div>
    );
  }
}

export default Add;
