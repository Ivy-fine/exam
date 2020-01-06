import React, { Component } from "react";
import SuperForm from "@/components/SuperForm";
import { connect } from "dva";
import { Select, Button, Input } from "antd";
import { interview_update, condition_interviews } from "@/services/interview";

const { Option } = Select;
const { TextArea } = Input;
@connect(state => state)
class Edit extends Component {
  state = {
    defaultFormValue: {
      interviews_stem: "",
      title: "",
      interviews_type_id: "",
      interviews_answer: ""
    }
  };
  componentDidMount() {
    condition_interviews({ interviews_id: this.interviewId }).then(res => {
      console.log(res.data[0]);
      this.setState({
        defaultFormValue: res.data[0]
      });
    });
  }
  handleFilterClick = values => {
    console.log(values);
    const interviews_id = this.interviewId;
    interview_update({ ...values, interviews_id }).then(res => {
      console.log(res);
    });
  };
  get interviewId() {
    return this.props.location.state.id;
  }
  render() {
    const { examType, interviewType, subjectType } = this.props.interview;
    const { defaultFormValue } = this.state;
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    const formConfig = [
      {
        label: "题干",
        name: "interviews_stem",
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
          initialValue: defaultFormValue.interviews_stem
        },
        content: <TextArea rows={18} />
      },
      {
        label: "题目类型",
        name: "interviews_type_id",
        fieldOptions: {
          rules: [{ required: true, message: "请选择题目类型" }],
          initialValue: defaultFormValue.interviews_type_id
        },
        content: (
          <Select style={{ width: "200px" }}>
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
      },
      {
        label: "答案信息",
        name: "interviews_answer",
        fieldOptions: {
          rules: [{ required: true, message: "请输入答案信息" }],
          initialValue: defaultFormValue.interviews_answer
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
