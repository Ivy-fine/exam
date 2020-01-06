import question from "./routesModules/question";
import users from "./routesModules/users";
import test from "./routesModules/test";
import grade from "./routesModules/grade";
import marking from "./routesModules/marking";
import dynamic from "@/utils/dynamic";
const routes = [
  {
    path: "/login",
    component: dynamic([], () => import("@/routes/Login/index.js"))
  },
  {
    path: "/",
    component: dynamic([], () => import("@/layout/baseLayout/index")),
    children: [
      {
        path: "/home",
        component: dynamic(["question"], () => import("@/routes/Home/index")),
        meta: {
          title: "统计概览",
          icon: "pie-chart"
        }
      },
      {
        path: "/filter",
        component: dynamic(["question"], () => import("@/routes/Filter/index")),
        meta: {
          title: "组件测试",
          icon: "pie-chart"
        }
      },
      ...question,
      ...users,
      ...test,
      ...grade,
      ...marking,
      {
        path: "/",
        redirect: "/home"
      }
    ]
  }
];
export const menusRoutes = routes[routes.length - 1].children;

const wRoutes = (function withRoute() {
  const obj = {};
  function getRoutes(routes) {
    routes.forEach(item => {
      obj[item.path] = item;
      if (item.children) {
        getRoutes(item.children);
      }
    });
  }
  getRoutes(routes);
  return key => {
    return obj[key];
  };
})();
export const withRoutes = wRoutes;
export default routes;
