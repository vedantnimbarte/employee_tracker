import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Tables from "../../pages/tables";
import Holidays from "../../pages/holidays";
import Leave from "../../pages/leave";
import RequestLeave from "../../pages/Request_Leave";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/tables" component={Tables} />
            <Route path="/app/holidays" component={Holidays} />
            <Route path="/app/leave" component={Leave} />
            <Route path="/app/request_leave" component={RequestLeave} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
