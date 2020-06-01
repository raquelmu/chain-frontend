import React, { Component } from "react";
import apiClient from "../../services/apiClient";


export default class UpdateProfile extends Component {
    state = {
        updateProfile : {
            // profile_image: "", 
            name: "",
            location: "",
            about: "",
          

        },
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
        .then(() => {
          console.log("update");
        })
        .catch((error) => {
          console.log(error);
        });
    };

  

    render(){

        const {  name, about, location } = this.state.updateProfile;

        return(
            <div>
                <h1>Update Profile</h1>
                    {/* <label>Image</label>
                    <input type="text" name="image" value={image} onChange={this.handleInput}/> */}
                    <label>Name</label>
                    <input type="text" name="name" value={name} onChange={this.handleInput} />
                    <label>About</label>
                    <input type="text" name="about" value={about} onChange={this.handleInput}/>
                    <label>Location</label>
                    <input type="text" name="location" value={location} onChange={this.handleInput}/>
              

                    <button type="sumbit" value="Update" onClick={this.handleUpdate}>Update</button>

            </div>
        )
        
    }
}