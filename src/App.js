import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./views/Login";
import Signup from "./views/Signup";
import Ads from "./views/Ads/Ads";
import Home from "./views/Home";
import SingleAd from "./views/Ads/SingleAd";
import SingleProfile from "./views/Profile/SingleProfile";
import Favorites from "./views/Favorites";
import CreateAd from "./components/Ad/CreateAd";
import UpdateAd from "./components/Ad/UpdateAd";


import { AnonRoute, PrivateRoute } from "./components";

import apiClient from "./services/apiClient";

export default class App extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    isLoading: true,
  };

  componentDidMount() {
    apiClient
      .whoami()
      .then((user) => {
        this.setState({
          isLoading: false,
          isLoggedIn: true,
          user,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          isLoggedIn: false,
          user: null,
        });
      });
  }
  handleSignup = ({ username, password }) => {
    apiClient
    .signup({ username, password })
    .then(({ data: user }) => {
      this.setState({
        isLoggedIn: true,
        user,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleLogin = ({ username, password }) => {
    apiClient
      .login({ username, password })
      .then(({ data: user }) => {
        this.setState({
          isLoggedIn: true,
          user,
        });
      })
      .catch((error) => {
        this.setState({
          isLoggedIn: false,
          user: null,
        });
      });
  };

  render() {
    const { isLoggedIn, isLoading, user } = this.state;
    return (
      <div>
        {isLoading && <div> Loading.......</div>}
        {!isLoading && (
          <div className="App">
            <Switch>              
              <Route
                exact
                path={"/"}
                component={Home} />
              <AnonRoute 
                exact
                path={"/signup"}
                isLoggedIn={isLoggedIn}>
                <Signup onSignup={this.handleSignup} />
              </AnonRoute>
              <PrivateRoute 
                exact 
                path={"/profile/:id"} 
                isLoggedIn={isLoggedIn}>
                <SingleProfile user={user} />
              </PrivateRoute>
              <PrivateRoute 
                exact
                path={"/ads/new"} 
                isLoggedIn={isLoggedIn}>
                <CreateAd />
              </PrivateRoute>
              <PrivateRoute 
                exact
                path={"/ads/:id/update"} 
                isLoggedIn={isLoggedIn}
                component={UpdateAd}
                />
              <PrivateRoute
                exact
                path={"/ads/:id"}
                isLoggedIn={isLoggedIn}
                component={SingleAd}
              />
              <AnonRoute 
                exact 
                path={"/login"} 
                isLoggedIn={isLoggedIn}>
                <Login onLogin={this.handleLogin} />
              </AnonRoute>
              <PrivateRoute
                exact
                path={"/ads"}
                isLoggedIn={isLoggedIn}
                component={Ads}
              />
              <PrivateRoute 
                exact 
                path={"/favorites"} 
                isLoggedIn={isLoggedIn}>
                <Favorites user={user} />
              </PrivateRoute>

              
              {/* <AnonRoute
                exact
                path={"/login"}
                isLoggedIn={isLoggedIn}>
                <Login onLogin={this.handleLogin} />
              </AnonRoute>
              <PrivateRoute
                exact
                path={"/ads/all"}
                isLoggedIn={isLoggedIn}>
                <Ads />
              </PrivateRoute> */}
            </Switch>
          </div>
        )}
      </div>
    );
  }
}