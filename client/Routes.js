import React, { Component, Fragment, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import About from "./components/About/About";
import AllProducts from "./components/Products/AllProducts";

/**
 * COMPONENT
 */
const Routes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route path="/home" component={Home} />
          <Redirect to="/home" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/" exact>
            {Login}
          </Route>
          <Route path="/login">{Login}</Route>
          <Route path="/signup">{Signup}</Route>
          <Route exact path="/About" component={About} />
          <Route exact path="/Products" component={AllProducts} />
        </Switch>
      )}
    </div>
  );
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default Routes;
