import React, { Component } from "react";
import SuperForm from "@/components/SuperForm";
import { connect } from "dva";
import { Select, Button, Input, message } from "antd";
import { question_update, condition_questions } from "@/services/question";

const { Option } = Select;
const { TextArea } = Input;
@connect(state => state)
class Edit extends Component {
  state = {
    defaultFormValue: {
      questions_stem: "",
      title: "",
      exam_id: "",
      subject_id: "",
      questions_type_id: "",
      questions_answer: ""
    }
  };
  componentDidMount() {
    condition_questions({ questions_id: this.questionId }).then(res => {
      this.setState({
        defaultFormValue: res.data[0]
      });
    });
  }
  handleFilterClick = values => {
    const questions_id = this.questionId;
    question_update({ ...values, questions_id }).then(res => {
      message.success(res.msg);
      this.props.history.push("/question/list");
    });
  };
  get questionId() {
    return (
      (this.props.location.state && this.props.location.state.id) ||
      localStorage.getItem("editingQuestionId")
    );
  }
  render() {
    const { examType, questionType, subjectType } = this.props.question;
    const { defaultFormValue } = this.state;
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    const formConfig = [
      {
        label: "题干",
        name: "questions_stem",
        fieldOptions: {
          rules: [{ required: true, message: "请输入题干信息" }],
          initialValue: defaultFormValue.title
        },
        content: <Input />
      },
      {
        label: "题目主题",
        name: "title",
        fieldOptions: {
          rules: [{ required: true, message: "请输入题目主题" }],
          initialValue: defaultFormValue.questions_stem
        },
        content: <TextArea rows={18} />
      },
      {
        label: "考试类型",
        name: "exam_id",
        fieldOptions: {
          rules: [{ required: true, message: "请选择考试类型" }],
          initialValue: defaultFormValue.exam_id
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
          rules: [{ required: true, message: "请选择课程类型" }],
          initialValue: defaultFormValue.subject_id
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
          rules: [{ required: true, message: "请选择题目类型" }],
          initialValue: defaultFormValue.questions_type_id
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
          rules: [{ required: true, message: "请输入答案信息" }],
          initialValue: defaultFormValue.questions_answer
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

export default Edit;
