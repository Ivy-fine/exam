import React, { Component } from 'react'
import { Radio} from 'antd';
import {connect} from "dva";

class UserHeader extends Component {
    handleChange=(e)=> {
          const {dispatch,id}=e.target.value;
          this.props.dispatch({type:dispatch})
          this.props.dispatch({type:'users/changeInded',id})
    }
    componentDidMount(){
        this.props.dispatch({type:"users/users_list"});
        this.props.dispatch({type:'users/changeInded',id:0})
    }
    render() {
        const {data,ind}=this.props;
        return (
            <div>
                <Radio.Group onChange={this.handleChange} defaultValue={ind >0?data[ind]:data[0] }>
                    {
                        data&&data.map((item,index)=>{
                            return (
                                <Radio.Button key={index} value={item}>{item.title}</Radio.Button>
                            )
                        })
                    }
                </Radio.Group>
                <h1>{ind>0?data[ind].title:data[0].title}</h1>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        ind:state.users.ind,
        list:state.users.data
    }
}
export default connect(mapStateToProps)(UserHeader);