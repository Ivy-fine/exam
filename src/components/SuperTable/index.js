import React, { Component } from "react";
import { Table, Row, Col } from "antd";
import {connect} from "dva";
import style from "./style.less";
class SuperTable extends Component {
  static defaultProps = {
    buttons: []
  };
  state = {};
  render() {
    return (
      <>
        <Row>
          <Col style={{ textAlign: "right" }} className={style.btns}>
            {this.props.buttons.map((item, index) =>
              React.cloneElement(item, {
                key: index
              })
            )}
          </Col>
        </Row>
        <Table loading={this.props.loading} {...this.props}></Table>
      </>
    );
  }
}
function mapStateToProps(state){
  const {loading}=state;
  return {
    loading:loading.global
  }
}

export default connect(mapStateToProps)(SuperTable);
