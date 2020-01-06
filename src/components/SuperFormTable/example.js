// import React, { Component } from "react";
// import { Input, Button, Select, Tag } from "antd";
// import SuperFormTable from "@/components/SuperFormTable";
// import { connect } from "dva";
// import style from "./style.less";
// const { Option } = Select;
// @connect(state => state)
// class Users extends Component {
//   state = {};
//   handleFilterClick(values) {
//     console.log(values);
//   }
//   get renderForm() {
//     const formConfig = [
//       {
//         label: "考试类型",
//         name: "examType",
//         content: <Input />
//       },
//       {
//         label: "Select",
//         name: "select",
//         content: (
//           <Select placeholder="Please select a country">
//             <Option value="china">China</Option>
//             <Option value="usa">U.S.A</Option>
//           </Select>
//         )
//       }
//     ];
//     const buttons = [
//       <Button type="primary" htmlType="submit">
//         查询
//       </Button>
//     ];
//     return { items: formConfig, onSubmit: this.handleFilterClick, buttons };
//   }
//   get renderTable() {
//     const { questionList } = this.props.question;
//     const columns = [
//       {
//         dataIndex: "title",
//         key: "title",
//         render: (text, record) => (
//           <div>
//             <a>{text}</a>
//             <div className={style.tags}>
//               {record.tags.map(tag => (
//                 <Tag color={tag.color} key={record.question_id}>
//                   {tag.text}
//                 </Tag>
//               ))}
//             </div>
//             <span>{record.user_name} 发布</span>
//           </div>
//         )
//       },
//       {
//         key: "action",
//         fixed: "right",
//         render: (text, record) => (
//           <span>
//             <a>编辑</a>
//           </span>
//         )
//       }
//     ];

//     const data = questionList.map(item => {
//       item.tags = [
//         { text: item.questions_type_text, color: "blue" },
//         { text: item.subject_text, color: "geekblue" },
//         { text: item.exam_name, color: "orange" }
//       ];
//       return item;
//     });
//     console.log(data);
//     return {
//       showHeader: false,
//       dataSource: data,
//       columns,
//       buttons: [
//         <Button>导入</Button>,
//         <Button>导出</Button>,
//         <Button>删除</Button>,
//         <Button>新增</Button>
//       ]
//     };
//   }
//   render() {
//     return (
//       <SuperFormTable
//         renderForm={this.renderForm}
//         renderTable={this.renderTable}
//       />
//     );
//   }
// }

// export default Users;
