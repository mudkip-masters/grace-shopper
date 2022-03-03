import React, { Component, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import About from "./components/About/About";
import AllProducts from "./components/Products/AllProducts";
import SingleProduct from "./components/Products/SingleProduct";

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
          <Route path="/login" exact component={AllProducts} />
          <Route exact path="/about" component={About} />
          <Route exact path="/products" component={AllProducts} />
          <Route exact path="/products/:id" component={SingleProduct} />
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
          <Route exact path="/products/:id" component={SingleProduct} />
        </Switch>
      )}
    </div>
  );
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default Routes;
