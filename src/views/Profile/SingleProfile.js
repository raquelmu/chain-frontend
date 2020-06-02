import React, { Component } from "react";
import apiClient from "../../services/apiClient";
import { Redirect, Link } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import UpdateProfile from "../../components/Profile/UpdateProfile";
import Button from "../../components/Button/Button";


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
        <h1>{user.about}</h1>
        <h1>{user.location}</h1>
        <h1>{user.profile_image}</h1>
        <h1>{user.points}</h1>




        <Button onClick={(e) => {this.handleDelete(user._id)}}>Delete account</Button>
        <Button onClick={(e) => {this.handleLogout(user._id)}}>Log out</Button>
        <Link to={`/profile/${this.props.user._id}/update`}><Button>Edit</Button></Link>

        <Menu user={this.props.user}/>
          
      </div>
    );
  }
}
