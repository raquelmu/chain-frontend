import React, { Component } from "react";
import apiClient from "../../services/apiClient";
import { Redirect, Link } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import Button from "../../components/Button/Button";


export default class SingleProfile extends Component {
  state = {
    hasBeenDeleted: false,
    logout: false,
  }

  handleDelete = (id) => {
    apiClient
      .deleteProf(id)
      .then(() => {
        this.setState({
          hasBeenDeleted: true
        })
      })        
      .catch((error) => {
      });
  };
  

  handleLogout = (id) => {
    apiClient
      .logout(id)
      .then(() => {
        this.setState({
          logout: true
        })
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { user } = this.props
    return (
      <div>
        {this.state.logout ?
          <Redirect to={"/"} />
        :
          <div>
            {this.state.hasBeenDeleted ? 
              <Redirect to={"/"} />
            :
              <div>
                <h1>{user.username}</h1>
                <h1>{user.about}</h1>
                <h1>{user.location}</h1>
                <h1>{user.profile_image}</h1>
                <h1>{user.points}</h1>


                <Button onClick={(e) => {this.handleDelete(user._id)}}>Delete account</Button>
                <Button onClick={(e) => {this.handleLogout(user._id)}}>Log out</Button>
                <Link to={`/profile/${this.props.user._id}/update`}>
                  <button className="buttonEditAd"><i className="fas fa-edit"></i></button>
                </Link>

                <Menu user={this.props.user}/>
              </div>
            }
          </div>
        } 
      </div>
    );
  }
}
