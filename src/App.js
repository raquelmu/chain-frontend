import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./views/Login";
import Signup from "./views/Signup";
import Ads from "./views/Ads/Ads";
import Home from "./views/Home";
import SingleAd from "./views/Ads/SingleAd";
import SingleProfile from "./views/Profile/SingleProfile";
import Favorites from "./views/Favorites";


import { AnonRoute, PrivateRoute } from "./components";

import apiClient from "./services/apiClient";

class App extends Component {
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
    const { isLoggedIn, isLoading } = this.state;
    return (
      <div>
        {isLoading && <div> Loading.......</div>}
        {!isLoading && (
          <div className="App">
            <Switch>              
              <Route exact path={"/"} component={Home} />
              <AnonRoute exact path={"/signup"} isLoggedIn={isLoggedIn}>
                <Signup />
              </AnonRoute>
              <PrivateRoute exact path={"/profile"} isLoggedIn={isLoggedIn}>
                <SingleProfile />
              </PrivateRoute>
              {/*<PrivateRoute exact path={"/newad"} isLoggedIn={isLoggedIn}>
                <SingleAd />
              </PrivateRoute>
              <PrivateRoute exact path={"/editad"} isLoggedIn={isLoggedIn}>
                <SingleAd />
              </PrivateRoute>
              <PrivateRoute exact path={"/favs"} isLoggedIn={isLoggedIn}>
                <Favorites />
              </PrivateRoute>*/}
              <PrivateRoute
                exact
                path={"/ads/:id"}
                isLoggedIn={isLoggedIn}
                component={SingleAd}
              />
              {/* <Route exact path={"/logout"} component={Signup} /> */}
              {/* <Route exact path={"/user/:id/rating"} component={SingleProfile} /> */}
              {/* <Route exact path={"/ads/join/add"} component={SingleAd} />
              <Route exact path={"/ads/join/remove"} component={SingleAd} /> */}
              {/* <Route exact path={"/ads/select"} component={AddAd} />
              <Route exact path={"/ads/completed"} component={AddAd} /> */}
              {/* <Route exact path={"user/favorites/add"} component={Favs} />
              <Route exact path={"user/favorites/remove"} component={Favs} /> */}

              <AnonRoute exact path={"/login"} isLoggedIn={isLoggedIn}>
                <Login onLogin={this.handleLogin} />
              </AnonRoute>
              <PrivateRoute
                exact
                path={"/ads"}
                isLoggedIn={isLoggedIn}
                component={Ads}
              />
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

export default App;
