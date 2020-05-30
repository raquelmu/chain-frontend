import React, { Component } from "react";
import apiClient from "../../services/apiClient";
import { Redirect } from "react-router-dom";
import Menu from "../../components/Menu/Menu";


export default class SingleProfile extends Component {


  handleDelete = (id) => {
    apiClient
      .deleteProf(id)
      .then(() => {
        console.log("done");
        return <Redirect to="/"/>   
      })        
      .catch((error) => {
        console.log(error);
      });
  };

  handleLogout = (id) => {
    apiClient
      .logout(id)
      .then(() => {
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { user } = this.props
    return (
      <div>
        <h1>{user.username}</h1>
        <button
            onClick={(e) => {
              this.handleDelete(user._id);       
            }}
          >
            Delete account
          </button>
          <button
            onClick={(e) => {
              this.handleLogout(user._id);
            }}
          >
            logout
          </button>
          <Menu user={this.props.user}/>
      </div>
    );
  }
}

//   render() {
//     return (
//       <div>
//         <h1>SingleProfile</h1>
//       </div>
//     );
//   }
// }
