import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button, Row, Col } from "antd";
@Form.create({ name: "validate_other" })
class SuperForm extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
    resetBtn: PropTypes.bool, //重置按钮
    formItemLayout: PropTypes.object, //表格布局
    colSpan: PropTypes.number, //col宽度,
    colAlign: PropTypes.string
  };
  static defaultProps = {
    resetBtn: true,
    formItemLayout: {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    },
    colSpan: 8,
    buttons: [],
    colAlign: "left"
  };

  state = {};
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  };
  handleReset = () => {
    this.props.form.resetFields();
  };
  get renderFields() {
    const { items, colSpan } = this.props;
    const { getFieldDecorator } = this.props.form;
    return items.map(item => {
      return (
        <Col key={item.name} span={item.colSpan || colSpan}>
          <Form.Item label={item.label}>
            {getFieldDecorator(item.name, item.fieldOptions)(item.content)}
          </Form.Item>
        </Col>
      );
    });
  }
  render() {
    const { formItemLayout, colSpan, colAlign } = this.props;
    return (
      <>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Row>
            {this.renderFields}
            {
              <Col
                style={{ textAlign: colAlign, paddingLeft: 20 }}
                span={colSpan}
              >
                {this.props.buttons.map((item, index) =>
                  React.cloneElement(item, {
                    key: index
                  })
                )}
                {this.props.resetBtn && (
                  <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                    重置
                  </Button>
                )}
              </Col>
            }
          </Row>
        </Form>
      </>
    );
  }
}

export default SuperForm;
