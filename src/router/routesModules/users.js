// 用户信息路由
import dynamic from "@/utils/dynamic";

export default [
  {
    path: "/user",
    component: dynamic(["users"], () => import("@/layout/main")),
    meta: {
      title: "用户管理",
      icon: "idcard"
    },
    children: [
      {
        path: "/user/list",
        component: dynamic(["users"], () => import("@/routes/User/Reveal")),
        meta: {
          title: "用户展示"
        }
      },
      {
        path: "/user/useradd",
        component: dynamic(["users"], () => import("@/routes/User/UserAdd")),
        meta: {
          title: "添加用户"
        }
      },
      {
        path: "/user/role",
        component: dynamic(["users"], () => import("@/routes/User/Role")),
        meta: {
          title: "角色管理"
        }
      }
    ]
  }
];
