import React, { Component } from "react";
import apiClient from "../../services/apiClient";
import { Redirect, Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Menu from "../Menu/Menu"
import './UpdateProfile.css'

export default class UpdateProfile extends Component {
    state = {
        updateProfile : {
            username: "",
            location: "",
            about: "",

        },
        hasBeenUpdated : false,
        userId: null,
        

    }
    handleInput = (e) => {
        console.log("event", e.target.value)
        console.log("name", e.target.name)
        this.setState( {
            updateProfile: {
                ...this.state.updateProfile, 
                [e.target.name] : e.target.value
            }
        })
    }
 //FALTA AÑADIR IMAGEN

 handleUpdate = () => {
    const id = this.props.match.params.id 

      apiClient
        .updateProfile(id, this.state.updateProfile)
        .then((response) => {
            console.log(response)
            this.setState({
                hasBeenUpdated : true,
                userId: response.data._id 
            })
        })
        .catch((error) => {
          console.log(error);
        });
    };

  

    render(){

        const {  username, about, location } = this.state.updateProfile;
        const { user } = this.props;

        return(
            <div className="page-update-profile">
                {this.state.hasBeenUpdated ?
                    <Redirect to={`/profile/${this.state.userId}`} />
                :
                    <div>
                        <Link to={`/profile/${user._id}`} className="comeback"><i className="fas fa-undo-alt"></i></Link>
                        <div className="image-profile-container"><img className="image-profile" src="../../img/profile-img.png" alt="profile-img"/></div>
                        <div class="form">
                            <label>Username</label>
                            <input type="text" name="name" value={username} onChange={this.handleInput} />
                            <label>About</label>
                            <input type="text" name="about" value={about} onChange={this.handleInput}/>
                            <label>Location</label>
                            <input type="text" name="location" value={location} onChange={this.handleInput}/>
                            <Button type="sumbit" value="Update" onClick={this.handleUpdate}>Update profile</Button>
                        </div>
                        <Menu user={this.props.user}/>
                    </div>
                }
            </div>
        )
    }
}