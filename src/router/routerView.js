import React from "react";
import { Switch, Route, Redirect } from "dva/router";

function RouterView(props) {
  const routes = props.routes;
  const routesArr = routes && routes.filter(item => !item.redirect);
  const redirectArr = routes && routes.filter(item => item.redirect);
  return (
    <Switch>
      {routesArr &&
        routesArr.map((item, index) => {
          return (
            <Route
              key={index}
              path={item.path}
              render={props => (
                <item.component {...props} childRoutes={item.children} />
              )}
            />
          );
        })}
      {redirectArr &&
        redirectArr.map((item, index) => {
          return <Redirect from={item.path} to={item.redirect} key={index} />;
        })}
    </Switch>
  );
}
export default RouterView;
