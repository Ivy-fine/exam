import React, { Component } from "react";
import ReactMarkdown from "react-markdown/with-html";
import style from "./style.less";
import { Layout } from "antd";
import { test_detail } from "@/services/test";
const { Content, Sider } = Layout;
class TestDetail extends Component {
  state = {
    testInfo: {}
  };
  componentDidMount() {
    const id = this.props.location.query
      ? this.props.location.query.id
      : localStorage.getItem("testDetailId");
    test_detail(id).then(res => {
      this.setState({
        testInfo: res.data
      });
    });
  }
  render() {
    const questions = this.state.testInfo.questions;
    return (
      <Layout>
        <Content className={style.questions}>
          {questions &&
            questions.map((item, index) => (
              <div key={item.questions_id} className={style.questionsItem}>
                <h5>
                  {index + 1}.{item.title}
                </h5>
                <ReactMarkdown source={item.questions_stem} />
              </div>
            ))}
        </Content>
        <Sider className={style.answer} width={550}>
          <h3>答案</h3>
          {questions &&
            questions.map((item, index) => (
              <div key={item.questions_id} className={style.answerItem}>
                <h5>
                  {index + 1}.{item.title}
                </h5>
                <ReactMarkdown source={item.questions_answer} />
              </div>
            ))}
        </Sider>
      </Layout>
    );
  }
}

export default TestDetail;
