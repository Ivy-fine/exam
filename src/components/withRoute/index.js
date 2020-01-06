import React, { Component } from "react";
import { withRouter } from "dva/router";
import { withRoutes } from "@/router/routes";
function WithRoute(WrappedComponent) {
  class MatchedComponent extends Component {
    get route() {
      return withRoutes(this.props.location.pathname);
    }
    render() {
      return <WrappedComponent {...this.props} route={this.route} />;
    }
  }
  return withRouter(MatchedComponent);
}

export default WithRoute;
