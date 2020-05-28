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
            updateAd: {
                ...this.state.updateProfile, 
                [e.target.name] : e.target.value
            }
        })
    }
 //FALTA AÑADIR IMAGEN Y FECHA A 

 handleUpdate = () => {
    const id = this.props.match.params.id 

      apiClient
        .updateAd(id, this.state.updateProfile)
        .then(() => {
          console.log("update");
        })
        .catch((error) => {
          console.log(error);
        });
    };

  

    //VALUE POR DEFECTO 5
    //STATUS POR DEFECTO AVAILABLE

    render(){

        const { image, title, description, location, date, email, phone, author, price, status } = this.state.updateAd;

        return(
            <div>
                <h1>Update Ad</h1>
                    {/* <label>Image</label>
                    <input type="text" name="image" value={image} onChange={this.handleInput}/> */}
                    <label>Title</label>
                    <input type="text" name="title" value={title} onChange={this.handleInput} />
                    <label>Description</label>
                    <input type="text" name="description" value={description} onChange={this.handleInput}/>
                    <label>Location</label>
                    <input type="text" name="location" value={location} onChange={this.handleInput}/>
                    {/* <label>Date</label>
                    <input type="text" name="date" value={date} onChange={this.handleInput}/> */}
                    <label>Email</label>
                    <input type="text" name="email" value={email} onChange={this.handleInput}/>
                    <label>Phone</label>
                    <input type="number" name="phone" value={phone} onChange={this.handleInput}/> 
                    <label>Author</label>
                    <input type="text" name="author" value={author} onChange={this.handleInput}/>
                    <label>Price</label>
                    <input type="number" name="price" value={price} onChange={this.handleInput}/>
                    <label>Status</label>
                    <input type="text" name="status" value={status}  onChange={this.handleInput}/>

                    <button type="sumbit" value="Update" onClick={this.handleUpdate}>Update</button>

            </div>
        )
        
    }
}