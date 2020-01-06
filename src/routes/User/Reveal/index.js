import UserHeader from "@/components/UserHeader";
import SuperTable from "@/components/SuperTable";
// 用户展示
import { connect } from "dva";
import React, { Component } from "react";
import "./style.less";

class Reveal extends Component {
  state = {
    user_tab: [
      {
        id: 0,
        title: "用户数据",
        dispatch: "users/users_list",
        columns: [
          {
            title: "用户名",
            dataIndex: "user_name",
            key: "user_name"
          },
          {
            title: "密码",
            dataIndex: "user_pwd",
            key: "user_pwd"
          },
          {
            title: "身份",
            dataIndex: "identity_text",
            key: "identity_text"
          }
        ]
      },
      {
        id: 1,
        title: "身份数据",
        dispatch: "users/identity_list",
        columns: [
          {
            title: "身份名称",
            dataIndex: "identity_text",
            key: "identity_text"
          }
        ]
      },
      {
        id: 2,
        title: "api接口权限",
        dispatch: "users/apiAuthority_list",
        columns: [
          {
            title: "api权限名称",
            dataIndex: "api_authority_text",
            key: "api_authority_text"
          },
          {
            title: "api权限url",
            dataIndex: "api_authority_url",
            key: "api_authority_url"
          },
          {
            title: "api权限方法",
            dataIndex: "api_authority_method",
            key: "api_authority_method"
          }
        ]
      },
      {
        id: 3,
        title: "身份和api接口关系",
        dispatch: "users/identityApiAuthority_list",
        columns: [
          {
            title: "身份名称",
            dataIndex: "identity_text",
            key: "identity_text"
          },
          {
            title: "api权限名称",
            dataIndex: "api_authority_text",
            key: "api_authority_text"
          },
          {
            title: "api权限url",
            dataIndex: "api_authority_url",
            key: "api_authority_url"
          },
          {
            title: "api权限方法",
            dataIndex: "api_authority_method",
            key: "api_authority_method"
          }
        ]
      },
      {
        id: 4,
        title: "试图接口权限",
        dispatch: "users/viewAuthority_list",
        columns: [
          {
            title: "视图权限名称",
            dataIndex: "view_authority_text",
            key: "view_authority_text"
          },
          {
            title: "视图id",
            dataIndex: "view_id",
            key: "view_id"
          }
        ]
      },
      {
        id: 5,
        title: "身份和试图权限关系",
        dispatch: "users/identityViewAuthority_list",
        columns: [
          {
            title: "身份",
            dataIndex: "identity_text",
            key: "identity_text"
          },
          {
            title: "视图名称",
            dataIndex: "view_authority_text",
            key: "view_authority_text"
          },
          {
            title: "视图id",
            dataIndex: "view_id",
            key: "view_id"
          }
        ]
      }
    ]
  };
  render() {
    const { user_tab } = this.state;
    const { ind, list } = this.props;
    const data = list.map(item => {
      item.key =
        item.user_id ||
        item.identity_id ||
        item.api_authority_id ||
        item.identity_api_authority_relation_id ||
        item.view_authority_id ||
        item.identity_view_authority_relation_id;
      return item;
    });
    return (
      <div>
        <UserHeader data={user_tab} />
        <SuperTable columns={ind>0?user_tab[ind].columns:user_tab[0].columns} dataSource={data} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    ind: state.users.ind,
    list: state.users.data
  };
}

export default connect(mapStateToProps)(Reveal);
