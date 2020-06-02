import React, { Component } from "react";
import apiClient from "../../services/apiClient";
import { Redirect } from "react-router-dom";


export default class UpdateAd extends Component {
    state = {
        updateAd : {
            image: "", 
            title: "",
            description: "",
            location: "",
            date: "",
            email: "",
            phone: 0,
            author: "",
            price: 5,
            status: "available",

        },
        hasBeenUpdated : false,
        idAd: null,
    }
    handleInput = (e) => {
        this.setState( {
            updateAd: {
                ...this.state.updateAd, 
                [e.target.name] : e.target.value
            }
        })
    }
 //FALTA AÑADIR IMAGEN Y FECHA A 

 handleUpdate = () => {
    const id = this.props.match.params.id 

      apiClient
        .updateAd(id, this.state.updateAd)
        .then((response) => {
            console.log(response)
            this.setState({
                hasBeenUpdated : true,
                idAd: response.data._id

            })
        })
        .catch((error) => {
        });
    };

  

    //VALUE POR DEFECTO 5
    //STATUS POR DEFECTO AVAILABLE

    render(){

        const { image, title, description, location, date, email, phone} = this.state.updateAd;
        return(
            <div>
                 {this.state.hasBeenUpdated ?
                    <Redirect to={`/ads/${this.state.idAd}`} />
                :  
                    <div>

                        <h1>Update Ad</h1>
                            <label>Image</label>
                            <input type="text" name="image" value={image} onChange={this.handleInput}/>
                            <label>Title</label>
                            <input type="text" name="title" value={title} onChange={this.handleInput} />
                            <label>Description</label>
                            <input type="text" name="description" value={description} onChange={this.handleInput}/>
                            <label>Location</label>
                            <input type="text" name="location" value={location} onChange={this.handleInput}/>
                            <label>Date</label>
                            <input type="text" name="date" value={date} onChange={this.handleInput}/>
                            <label>Email</label>
                            <input type="text" name="email" value={email} onChange={this.handleInput}/>
                            <label>Phone</label>
                            <input type="number" name="phone" value={phone} onChange={this.handleInput}/> 
                            <button type="sumbit" value="Update" onClick={this.handleUpdate}>Update</button>
                    </div>
                }
            </div>
        )
        
    }
}