import dynamic from "@/utils/dynamic";

export default [
  {
    path: "/marking",
    component: dynamic(["marking"], () => import("@/layout/main")),
    meta: {
      title: "阅卷管理",
      icon: "bar-chart"
    },
    children: [
        {
            path:"/marking/pending",
            component:dynamic(["marking","class","question"],()=>import ("@/routes/Marking/Pending")),
            meta:{
                title:"待批班级"
            }
        },{
          path:"/marking/detail",
          component:dynamic(["marking"],()=>import ("@/routes/Marking/Detail")),
          meta:{
            menuHide: true
          }
        }

    ]
  }
];
