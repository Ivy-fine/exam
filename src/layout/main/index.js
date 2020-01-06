import React from "react";
import RouterView from "@/router/routerView";
function Main(props) {
  return <RouterView routes={props.childRoutes} />;
}
export default Main;
