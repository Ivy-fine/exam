import React from "react";
import { Router } from "dva/router";
import RouterView from "./routerView";
import routes from "./routes";
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <RouterView routes={routes} />
    </Router>
  );
}

export default RouterConfig;
