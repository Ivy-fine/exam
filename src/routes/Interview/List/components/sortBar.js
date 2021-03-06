import React, { Component } from "react";
import style from "./style.less";
import MyTag from "./MyTag";
import { connect } from "dva";
class SortBar extends Component {
  state = {
    checked_all_subject: false
  };
  handleChangeAll = () => {
    const checked = this.state.checked_all_subject;
    this.setState({
      checked_all_subject: !checked
    });
    this.props.dispatch({
      type: "question/checkedAllSubject",
      payload: { checked: !checked }
    });
  };
  handleChangeOne = (subject_id, checked) => {
    this.props.dispatch({
      type: "question/checkedSubject",
      payload: { subject_id, checked }
    });
    const allChecked = this.props.subjectType.every(
      item => item.checked === true
    );
    this.setState({
      checked_all_subject: allChecked
    });
  };
  render() {
    const { subjectType } = this.props;
    const { checked_all_subject } = this.state;
    return (
      <div className={style.sortBar}>
        <div className={style.courseType}>
          <span>课程类型:</span>
          <div>
            <MyTag
              checked={checked_all_subject}
              handleChange={this.handleChangeAll}
            >
              All
            </MyTag>
            {subjectType.map(item => (
              <MyTag
                key={item.subject_id}
                checked={item.checked}
                handleChange={this.handleChangeOne.bind(
                  this,
                  item.subject_id,
                  !item.checked
                )}
              >
                {item.subject_text}
              </MyTag>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(SortBar);
