import React, { Component } from "react";
import SuperForm from "@/components/SuperForm";
import { Input, Select, InputNumber, DatePicker, Button, message } from "antd";
import { connect } from "dva";
import style from "./style.less";
import { test_add } from "@/services/test";
const { Option } = Select;
const { RangePicker } = DatePicker;
@connect(state => state)
class TestAdd extends Component {
  state = {};
  handleFilterClick = values => {
    console.log(values);
    const { subject_id, title, exam_id, number } = values;
    const times = values.time.map(item => item._d.getTime());
    test_add({
      subject_id,
      title,
      exam_id,
      number,
      start_time: times[0],
      end_time: times[1]
    }).then(res => {
      message.success(res.msg);
      this.props.history.push("/test/list");
    });
  };
  get formConfig() {
    const { examType, subjectType } = this.props.question;
    return {
      items: [
        {
          label: "试卷名称",
          name: "title",
          fieldOptions: {
            rules: [{ required: true, message: "请输入试卷名称" }]
          },
          content: <Input style={{ width: "500px" }} />
        },
        {
          label: "选择考试类型",
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
          label: "选择课程",
          name: "subject_id",
          fieldOptions: {
            rules: [{ required: true, message: "请选择课程" }]
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
          label: "设置题量",
          name: "number",
          fieldOptions: {
            rules: [{ required: true, message: "请设置题量" }],
            initialValue: 4
          },
          content: <InputNumber min={3} max={40} />
        },
        {
          label: "考试时间",
          name: "time",
          fieldOptions: {
            rules: [{ required: true, message: "请选择时间" }]
          },
          content: (
            <RangePicker
              showTime={{ format: "HH:mm:ss" }}
              format="YYYY-MM-DD HH:mm:ss"
              placeholder={["开始时间", "结束时间"]}
            />
          )
        }
        // {
        //   name: "end_time",
        //   fieldOptions: {
        //     rules: [{ required: true, message: "请选择结束时间" }]
        //   },
        //   content: <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
        //   colSpan: 4
        // }
      ],
      buttons: [
        <Button type="primary" htmlType="submit">
          创建试卷
        </Button>
      ],
      formItemLayout: {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 }
      }
    };
  }
  render() {
    return (
      <div className={style.addForm}>
        <SuperForm
          items={this.formConfig.items}
          onSubmit={this.handleFilterClick}
          buttons={this.formConfig.buttons}
          resetBtn={false}
          formItemLayout={this.formConfig.formItemLayout}
          colSpan={24}
        />
      </div>
    );
  }
}

export default TestAdd;
