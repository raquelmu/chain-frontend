import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

// import Login from "./views/Login";
// import Home from "./views/Home";

import Ads from "./views/Ads/Ads";
//import AddAd from "./views/AddAd";
import Home from "./views/Home";


// import { AnonRoute, PrivateRoute } from "./components";

// import apiClient from "./services/apiClient";
// import Protected from "./views/Protected";

// class App extends Component {
//   state = {
//     isLoggedIn: false,
//     user: null,
//     isLoading: true,
//   };

//   componentDidMount() {
//     apiClient
//       .whoami()
//       .then((user) => {
//         this.setState({
//           isLoading: false,
//           isLoggedIn: true,
//           user,
//         });
//       })
//       .catch((error) => {
//         this.setState({
//           isLoading: false,
//           isLoggedIn: false,
//           user: null,
//         });
//       });
//   }

//   handleLogin = ({ username, password }) => {
//     apiClient
//       .login({ username, password })
//       .then(({ data: user }) => {
//         this.setState({
//           isLoggedIn: true,
//           user,
//         });
//       })
//       .catch((error) => {
//         this.setState({
//           isLoggedIn: false,
//           user: null,
//         });
//       });
//   };

//   render() {
//     const { isLoggedIn, isLoading } = this.state;
//     return (
//       <div>
//         {isLoading && <div> Loading.......</div>}
//         {!isLoading && (
//           <div className="App">
//             <Switch>
//               <Route exact path={"/"} component={Home} />
//               <AnonRoute exact path={"/login"} isLoggedIn={isLoggedIn}>
//                 <Login onLogin={this.handleLogin} />
//               </AnonRoute>
//               <PrivateRoute exact path={"/protected"} isLoggedIn={isLoggedIn}>
//                 <Protected />
//               </PrivateRoute>
//             </Switch>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/ads/all"} component={Ads} />
       {/* <Route exact path={"/ads/add"} component={AddAd} />
         <Route exact path={"/ads/:id"} component={SingleAd} />
        <Route exact path={"/ads/:id/update"} component={SingleAd} />
        <Route exact path={"/profile"} component={Profile} />
        <Route exact path={"/profile/:id"} component={Profile} />
        <Route exact path={"/favs"} component={Favs} />
        <Route exact path={"/search"} component={Ads} /> */}
      </Switch>
    </div>
  );
}


export default App;
