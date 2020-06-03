import React, { Component } from "react";
import apiClient from "../../services/apiClient";
import { Redirect } from "react-router-dom";
import Button from "../../components/Button/Button";


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

        return(
            <div>
                {this.state.hasBeenUpdated ?
                    <Redirect to={`/profile/${this.state.userId}`} />
                :
                    <div>
                        <h1>Update Profile</h1>
                            <label>Username</label>
                            <input type="text" name="name" value={username} onChange={this.handleInput} />
                            <label>About</label>
                            <input type="text" name="about" value={about} onChange={this.handleInput}/>
                            <label>Location</label>
                            <input type="text" name="location" value={location} onChange={this.handleInput}/>
                            <Button type="sumbit" value="Update" onClick={this.handleUpdate}>Save</Button>
                    </div>
                }
            </div>
        )
    }
}