import React, { Component } from "react";
import SuperForm from "@/components/SuperForm";
import { connect } from "dva";
import { Select, Button, Input } from "antd";
import { interview_add } from "@/services/interview";

const { Option } = Select;
const { TextArea } = Input;
@connect(state => state)
class Add extends Component {
  state = {};
  handleFilterClick = values => {
    console.log(values);
    const user_id = this.props.user.info.user_id;
    interview_add({ ...values, user_id }).then(res => {
      console.log(res);
    });
  };
  render() {
    const { interviewType } = this.props.interview;
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    const formConfig = [
      {
        label: "题干",
        name: "interviews_stem",
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
        label: "题目类型",
        name: "interviews_type_id",
        fieldOptions: {
          rules: [{ required: true, message: "请选择题目类型" }]
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
