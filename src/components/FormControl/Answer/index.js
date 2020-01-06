import React, { Component } from "react";
import { Input, Switch, Icon, Checkbox } from "antd";
import PropTypes from "prop-types";
class Answer extends Component {
  static proptypes = {
    onChange: PropTypes.func,
    type: PropTypes.oneOf(["radio", "checkbox"]),
    mode: PropTypes.oneOf(["edit", "use"]),
    num: PropTypes.number
  };
  static defaultProps = {
    type: "radio",
    mode: "edit",
    num: 1
  };
  state = { val: [], letter: "ABCDEFGHIJK" };
  static getDerivedStateFromProps(nextProps, state) {
    if (
      nextProps.value &&
      JSON.stringify(state.val) !== JSON.stringify(nextProps.value)
    ) {
      return {
        val: nextProps.value
      };
    } else if (state.val.length === 0) {
      const val = [];
      for (let i = 0; i < nextProps.num; i++) {
        val.push({
          letter: state.letter[i],
          isAnswer: false,
          value: ""
        });
      }
      return { val };
    }
    return null;
  }
  triggerChange = value => {
    const { onChange } = this.props;
    if (onChange) {
      onChange([...value]);
    }
  };
  handleTextChange = (e, index) => {
    const val = this.state.val;
    val[index].value = e.target.value;
    this.triggerChange(val);
  };
  handleAnswerChange = (index, checked) => {
    const val = this.state.val;
    const { type } = this.props;
    if (type === "radio") {
      val.forEach(item => {
        item.isAnswer = false;
      });
    }
    val[index].isAnswer = checked;
    this.triggerChange(val);
  };
  handleSelectChange = (e, index) => {
    const val = this.state.val;
    val[index].isAnswer = e.target.checked;
    val[index].value = this.props.list[index];
    this.triggerChange(val);
  };
  render() {
    const { val, letter } = this.state;
    const { mode, list } = this.props;
    return (
      <div>
        {val.map((item, index) =>
          mode === "edit" ? (
            <div style={{ display: "flex" }} key={index}>
              {letter[index]}
              <Input
                style={{ width: "200px", margin: "0 10px" }}
                onChange={e => this.handleTextChange(e, index)}
              />
              <Switch
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
                checked={item.isAnswer}
                onChange={checked => this.handleAnswerChange(index, checked)}
              />
            </div>
          ) : (
            <div style={{ display: "flex" }} key={index}>
              <Checkbox
                onChange={e => this.handleSelectChange(e, index)}
                checked={item.isAnswer}
              >
                {list[index]}
              </Checkbox>
            </div>
          )
        )}
      </div>
    );
  }
}

export default Answer;
