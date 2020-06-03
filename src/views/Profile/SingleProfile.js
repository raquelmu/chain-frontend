import React, { Component } from "react";
import apiClient from "../../services/apiClient";
import { Redirect, Link } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import Button from "../../components/Button/Button";

import './SingleProfile.css'

export default class SingleProfile extends Component {
  state = {
    hasBeenDeleted: false,
    logout: false,
    profileId: null,
    profile: {
      username: "",
      about: "",
      location: "",
      points: "",

    }
  }

  async componentDidMount(){ 
    console.log()
    const response = await apiClient.getProfileById(this.props.match.params.id)
    console.log(response)
    this.setState({
      profile: {
        username: response.data.username,
        about: response.data.about,
        location: response.data.location,
        points: response.data.points,
      }
    })
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
      <div className="page-profile">
        {this.state.logout ?
          <Redirect to={"/"} />
        :
          <div>
            {this.state.hasBeenDeleted ? 
              <Redirect to={"/"} />
            :
              <div>
                <div className="image-profile-container"><img class="image-profile" src="../img/profile-img.png"/></div>
                <h4>{this.state.profile.username}</h4>
                <p>{this.state.profile.about}</p>
                <h4>{this.state.profile.location}</h4>
                <h4>Points: {this.state.profile.points}</h4>

              {this.props.user._id === this.props.match.params.id &&
                <div>
                  <div className="buttonsProfile">
                    <Button onClick={(e) => {this.handleLogout(user._id)}}><i className="fas fa-power-off"></i> Logout</Button>
                    <Button onClick={(e) => {this.handleDelete(user._id)}} className="danger">Delete account</Button>
                  </div>
                  <Link to={`/profile/${this.props.user._id}/update`}>
                    <button className="buttonEditAd"><i className="fas fa-edit"></i></button>
                  </Link>
                </div>
              }

                <Menu user={this.props.user}/>
               
              </div>
            }
          </div>
        } 
      </div>
    );
  }
}
