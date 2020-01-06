import React, { Component } from "react";
import SuperForm from "@/components/SuperForm";
import SuperTable from "@/components/SuperTable";
import style from "./style.less";
class SuperFormTable extends Component {
  state = {};
  render() {
    const { renderTable, renderForm } = this.props;
    return (
      <>
        <div className={style.form}>
          {this.props.children}
          <SuperForm {...renderForm} />
        </div>
        <div className={style.table}>
          <SuperTable {...renderTable} />
        </div>
      </>
    );
  }
}

export default SuperFormTable;
