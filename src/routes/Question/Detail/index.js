import React, { Component } from "react";
import ReactMarkdown from "react-markdown/with-html";
import { Layout, Tag } from "antd";
import style from "./style.less";
import { connect } from "dva";
const { Content, Sider } = Layout;
@connect(state => state)
class Detail extends Component {
  state = {
    questionInfo: {}
  };
  componentDidMount() {
    this.props.dispatch({
      type: "question/condition_questions",
      payload: { questions_id: this.questionId }
    });
  }
  get questionId() {
    return (
      (this.props.location.state && this.props.location.state.id) ||
      localStorage.getItem("detailQuestionId")
    );
  }
  get questionInfo() {
    const questionInfo = this.props.question.questionList[0] || {};
    questionInfo.tags = [
      { text: questionInfo.questions_type_text, color: "blue" },
      { text: questionInfo.subject_text, color: "geekblue" },
      { text: questionInfo.exam_name, color: "orange" }
    ];
    return questionInfo;
  }
  render() {
    const questionInfo = this.questionInfo;
    return (
      <Layout>
        <Content className={style.questions}>
          <h5>出题人：{questionInfo.user_name}</h5>
          <h3>题目信息</h3>
          <div className={style.tags}>
            {questionInfo.tags.map((tag, index) => (
              <Tag color={tag.color} key={index}>
                {tag.text}
              </Tag>
            ))}
          </div>
          {
            <div className={style.questionsItem}>
              <h5>{questionInfo.title}</h5>
              <ReactMarkdown source={questionInfo.questions_stem} />
            </div>
          }
        </Content>
        <Sider className={style.answer} width={500}>
          <h3>答案信息</h3>
          {
            <div className={style.answerItem}>
              <ReactMarkdown source={questionInfo.questions_answer} />
            </div>
          }
        </Sider>
      </Layout>
    );
  }
}

export default Detail;
