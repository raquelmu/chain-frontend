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
import UpdateProfile from "./components/Profile/UpdateProfile";



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
      .then((response) => {
        this.setState({
          isLoading: false,
          isLoggedIn: true,
          user: response.data,
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
  handleLogout = () => {
    apiClient
      .logout()
      .then(() => {
        this.setState({
          isLoggedIn: false,
          user: null,        })
      })
      .catch((error) => {
        console.log(error);
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
                isLoggedIn={isLoggedIn}
                user={user}
                onLogout = {this.handleLogout}
                component={SingleProfile}>
              </PrivateRoute>
              <PrivateRoute 
                exact
                path={"/profile/:id/update"} 
                isLoggedIn={isLoggedIn}
                component={UpdateProfile}
                user={user}
                />
              <PrivateRoute 
                exact
                path={"/ads/new"} 
                user={user}
                isLoggedIn={isLoggedIn}
                component={CreateAd}>
              </PrivateRoute>
              <PrivateRoute
                exact
                path={"/ads/:id"}
                isLoggedIn={isLoggedIn}
                user={user}
                component={SingleAd}
              /> 
              <PrivateRoute 
                exact
                path={"/ads/:id/update"} 
                isLoggedIn={isLoggedIn}
                user={user}
                component={UpdateAd}
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
                user={user}
                component={Ads}
              />
              <PrivateRoute 
                exact 
                path={"/favorites"} 
                isLoggedIn={isLoggedIn}
                user={user}
                component={Favorites}>
              </PrivateRoute>
            </Switch>
          </div>
        )}
      </div>
    );
  }
}