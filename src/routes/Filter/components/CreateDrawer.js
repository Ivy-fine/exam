import React, { Component } from "react";
import { Drawer, Button, Select, Input } from "antd";
import SuperForm from "@/components/SuperForm";
import { Answer } from "@/components/FormControl";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { connect } from "dva";

const { Option } = Select;
@connect(state => state)
class CreateDrawer extends Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };
  handleFilterClick = values => {
    console.log(values);
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
          rules: [{ required: true, message: "请输入答案信息" }],
          initialValue: ""
        },
        content: <ReactQuill />
      },
      {
        label: "题目",
        name: "dddd",
        fieldOptions: {},
        content: (
          <Answer
            num={4}
            type="checkbox"
            mode="use"
            list={["aaa", "bbb", "ccc", "ddd"]}
          />
        )
      }
    ];
    const buttons = [
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    ];
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          Open
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          width={600}
        >
          <SuperForm
            items={formConfig}
            onSubmit={this.handleFilterClick}
            buttons={buttons}
            resetBtn={false}
            formItemLayout={formItemLayout}
            colSpan={24}
          />
        </Drawer>
      </div>
    );
  }
}

export default CreateDrawer;
