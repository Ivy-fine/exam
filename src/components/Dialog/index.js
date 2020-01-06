import React, { Component } from "react";
import { Modal, Button } from "antd";
import PropType from "prop-types";
class Dialog extends Component {
  static propTypes = {
    btnType: PropType.string,
    btnText: PropType.string,
    onOk: PropType.func,
    title: PropType.string,
    okText: PropType.string,
    cancelText: PropType.string
  };
  static defaultProps = {
    btnType: "primary",
    btnText: "button",
    content: <p>内容</p>,
    onOk: cb => {
      setTimeout(() => {
        console.log("click ok");
        cb();
      }, 2000);
    },
    title: "title",
    okText: "确认",
    cancelText: "取消"
  };
  state = {
    visible: false,
    confirmLoading: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };
  hideModel = () => {
    this.setState({
      visible: false,
      confirmLoading: false
    });
  };
  handleOk = () => {
    this.setState({
      confirmLoading: true
    });
    this.props.onOk(this.hideModel);
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;
    const { btnType, btnText, content, title, okText, cancelText } = this.props;
    return (
      <div>
        <Button type={btnType} onClick={this.showModal}>
          {btnText}
        </Button>
        <Modal
          title={title}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          okText={okText}
          cancelText={cancelText}
        >
          {content}
        </Modal>
      </div>
    );
  }
}
export default Dialog;
