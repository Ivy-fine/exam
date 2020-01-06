import React, { Component } from 'react'
import {connect} from "dva"
import {Select,Button} from "antd";
import SuperFormTable from "@/components/SuperFormTable";
import storage from "@/utils/storage";
class MarkingDetail extends Component {
    componentDidMount(){
        this.props.dispatch({
            type:"marking/marking_list"
        });
    }
    handleFilterClick=()=>{
        console.log('111')
    }
    get renderForm(){
        const formConfig = [
          {
            label: "状态",
            name: "status",
            content: (
              <Select></Select>
            )
          },
          {
            label: "班级",
            name: "grade_name",
            content: (
              <Select></Select>
            )
          }
        ];
        const buttons = [
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        ];
        return {
          items: formConfig,
          onSubmit: this.handleFilterClick,
          buttons,
          resetBtn: false
        };
    }
    get renderTable(){
        const {data}=this.props;
        let list=[];
        data&&data.forEach(item=>{
            if(item.grade_id===storage.getItem('marking').grade_id){
                item.grade_name=storage.getItem('marking').grade_name
                return list.push(item)
            }
        });
        const columns=[
            {
                title:"班级",
                dataIndex:"grade_name",
                key:"student_id"
            },{
                title:"姓名",
                key:"student_name",
                dataIndex:"student_name"
            },{
                title:"阅卷状态",
                render:(record)=>(
                    <span>
                        {record.status===0?'未阅':"已阅"}
                    </span>
                )
            },{
                title:"开始时间",
                key:"start_time",
                dataIndex:"start_time"
            },{
                title:"结束时间",
                key:"end_time",
                dataIndex:"end_time"
            },{
                title:"成材率",
                render:()=>(
                    <span>-</span>
                )
            },{
                title:"操作",
                render:(record)=>{
                    return <span>
                                <a>批卷</a>
                            </span>
                }
            }
        ]
          const buttons = [
            <span style={{ float: "left",marginBottom:"20px" }}>试卷列表</span>,
          ];
          return {
            dataSource: list,
            columns,
            buttons,
            rowKey: "student_id"
          };
    }
    render() {
        return (
            <SuperFormTable
                renderForm={this.renderForm}
                renderTable={this.renderTable}
            />
        )
    }
}
function mapStateToProps(state){
    const {marking}=state;
    return {
      data:marking.data
    }
}
export default connect(mapStateToProps)(MarkingDetail);