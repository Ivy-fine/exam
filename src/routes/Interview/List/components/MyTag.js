import React, { Component } from "react";
import { Tag } from "antd";
import PropTypes from "prop-types";
const { CheckableTag } = Tag;
class MyTag extends Component {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    handleChange: PropTypes.func
  };
  render() {
    const { checked, handleChange } = this.props;
    return (
      <CheckableTag {...this.props} checked={checked} onChange={handleChange} />
    );
  }
}

export default MyTag;
