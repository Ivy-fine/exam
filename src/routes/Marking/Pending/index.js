import React, { Component } from 'react'
import {connect} from "dva"
import SuperTable from "@/components/SuperTable";
import storage from "@/utils/storage";
class Pending extends Component {
    componentDidMount(){
        this.props.dispatch({
            type:"marking/marking_list"
        });
        this.props.dispatch({
            type:"class/fetchGrade"
        })
    }
    handleGoToDetail=(record)=>{
        this.props.history.push({
            pathname:"/marking/detail"
        })
        storage.setItem('marking',record);
    }
    render() {
        const {data,grade}=this.props;
        let list=[];
        data&&data.forEach(item=>{
           return grade&&grade.forEach(val=>{
               if(val.grade_id===item.grade_id){
                   list.push(val)
                   list=[...new Set(list)];
               }
           })
        })
        const columns=[
            {
                title: '班级名',
                dataIndex:"grade_name" ,
                key: 'grade_id',
            },{
                title:"课程名称",
                dataIndex:"subject_text",
                key:'subject_id'
            },{
                title:"班级号",
                dataIndex:"room_text",
                key:"room_id"
            },{
                title:"操作",
                render:(record)=>{
                    return <span onClick={()=>{this.handleGoToDetail(record)}} >
                                <a>批卷</a>
                            </span>
                }
            }
        ]
        return (
            <SuperTable dataSource={list} rowKey="room_id" columns={columns} />
        )
    }
}
function mapStateToProps(state){
    const {marking}=state;
  return {
      data:marking.data,
      grade:state.class.grade,
  }
}
export default connect(mapStateToProps)(Pending)