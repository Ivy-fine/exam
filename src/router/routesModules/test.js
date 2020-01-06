import dynamic from "@/utils/dynamic";

export default [
  {
    path: "/test",
    component: dynamic([], () => import("@/layout/main")),
    meta: {
      title: "考试管理",
      icon: "copy"
    },
    children: [
      {
        path: "/test/add",
        component: dynamic(["question"], () => import("@/routes/Test/Add")),
        meta: {
          title: "添加考试"
        }
      },
      {
        path: "/test/list",
        component: dynamic(["question"], () => import("@/routes/Test/List")),
        meta: {
          title: "试卷列表"
        }
      },
      {
        path: "/test/detail",
        component: dynamic(["question"], () => import("@/routes/Test/Detail")),
        meta: {
          title: "试卷详情",
          menuHide: true
        }
      }
    ]
  }
];
