import dynamic from "@/utils/dynamic";

export default [
  {
    path: "/question",
    component: dynamic(["question"], () => import("@/layout/main")),
    meta: {
      title: "试题管理",
      icon: "form"
    },
    children: [
      {
        path: "/question/add",
        component: dynamic(["question"], () => import("@/routes/Question/Add")),
        meta: {
          title: "添加试题"
        }
      },
      {
        path: "/question/edit",
        component: dynamic(["question"], () =>
          import("@/routes/Question/Edit")
        ),
        meta: {
          title: "编辑试题",
          menuHide: true
        }
      },
      {
        path: "/question/classify",
        component: dynamic([], () => import("@/routes/Question/Classify")),
        meta: {
          title: "试题分类"
        }
      },
      {
        path: "/question/list",
        component: dynamic([], () => import("@/routes/Question/List")),
        meta: {
          title: "查看试题"
        }
      },
      {
        path: "/question/detail",
        component: dynamic([], () => import("@/routes/Question/Detail")),
        meta: {
          title: "试题详情",
          menuHide: true
        }
      },
      {
        path: "/question",
        redirect: "/question/add"
      }
    ]
  }
];
