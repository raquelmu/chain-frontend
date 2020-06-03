import React, { Component } from "react";
import apiClient from "../../services/apiClient";
import { Redirect } from "react-router-dom";
import Button from '../Button/Button'
import Menu from '../Menu/Menu'

import './UpdateAd.css'

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
            <div class="page-update-ad">
                 {this.state.hasBeenUpdated ?
                    <Redirect to={`/ads/${this.state.idAd}`} />
                :
                    <div>
                        <div className="containerButtonAddPhoto">
                            <button id="buttonAddPhoto">
                                Add photo
                            </button>
                        </div>
                        <div className="form">
                            <label>Title</label>
                            <input type="text" name="title" value={title} onChange={this.handleInput}  />
                            <label>Description</label>
                            <input type="text" name="description" value={description} onChange={this.handleInput} />
                            <label>Location</label>
                            <input type="text" name="location" value={location} onChange={this.handleInput} />
                            <label>Date</label>
                            <input type="text" name="date" value={date} onChange={this.handleInput} />
                            <label>Email</label>
                            <input type="text" name="email" value={email} onChange={this.handleInput} />
                            <label>Phone</label>
                            <input type="number" name="phone" value={phone} onChange={this.handleInput} /> 
                            <Button type="sumbit" onClick={this.handleUpdate}>Update</Button>
                        </div>
                        <Menu user={this.props.user}/>
                    </div>
                }
            </div>
        )
        
    }
}