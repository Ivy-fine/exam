import dynamic from "@/utils/dynamic";

export default [
  {
    path: "/interview",
    component: dynamic(["interview"], () => import("@/layout/main")),
    meta: {
      title: "试题管理",
      icon: "form"
    },
    children: [
      {
        path: "/interview/add",
        component: dynamic(["interview"], () =>
          import("@/routes/interview/Add")
        ),
        meta: {
          title: "添加试题"
        }
      },
      {
        path: "/interview/edit",
        component: dynamic(["interview"], () =>
          import("@/routes/interview/Edit")
        ),
        meta: {
          title: "编辑试题",
          menuHide: true
        }
      },
      {
        path: "/interview/classify",
        component: dynamic([], () => import("@/routes/interview/Classify")),
        meta: {
          title: "试题分类"
        }
      },
      {
        path: "/interview/list",
        component: dynamic([], () => import("@/routes/interview/List")),
        meta: {
          title: "查看试题"
        }
      },
      {
        path: "/interview/detail/:id",
        component: dynamic([], () => import("@/routes/interview/List")),
        meta: {
          title: "试题详情",
          menuHide: true
        }
      },
      {
        path: "/interview/edit/:id",
        component: dynamic([], () => import("@/routes/interview/List")),
        meta: {
          title: "编辑试题",
          menuHide: true
        }
      },
      {
        path: "/interview",
        redirect: "/interview/add"
      }
    ]
  }
];
