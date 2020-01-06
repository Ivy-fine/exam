import dynamic from "@/utils/dynamic";

export default [
  {
    path: "/grade",
    component: dynamic(["class"], () => import("@/layout/main")),
    meta: {
      title: "班级管理",
      icon: "team"
    },
    children: [
      {
        path: "/grade/grade",
        component: dynamic(["class"], () => import("@/routes/Grade/Grade")),
        meta: {
          title: "班级管理"
        }
      },
      {
        path: "/grade/class",
        component: dynamic(["class"], () => import("@/routes/Grade/ClassRoom")),
        meta: {
          title: "教室管理"
        }
      },
      {
        path: "/grade/student",
        component: dynamic(["class"], () => import("@/routes/Grade/Student")),
        meta: {
          title: "学生管理"
        }
      },
      {
        path: "/grade",
        redirect: "/grade/grade"
      }
    ]
  }
];
