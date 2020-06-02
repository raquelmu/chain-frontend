import React, { Component } from "react";
import apiClient from "../../services/apiClient";
import Button from '../Button/Button';
import Menu from '../Menu/Menu'
import { Redirect } from "react-router-dom";

import './CreateAd.css'

export default class CreateAd extends Component {
    state = {
        newAd : {
            image: "", 
            title: "",
            description: "",
            location: "",
            date: "",
            email: "",
            phone: 0,
        },
        hasBeenCreatedAd: false,
        idAd: null,
    }
    handleInput = (e) => {
        console.log("event", e.target.value)
        console.log("name", e.target.name)
        this.setState( {
            newAd: {
                ...this.state.newAd, 
                [e.target.name] : e.target.value
            }
        })
    }
 //FALTA AÑADIR IMAGEN Y FECHA A "functionToCreateAd"

    functionToCreateAd = () => {
        apiClient.createAd(this.state.newAd)
        console.log(this.state.newAd)
        .then(response => {
            this.setState({
                newAd: response
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    handleClickCreateAd = (e) => {

        this.functionToCreateAd();

        this.setState({
            newAd : {
                image: "", 
                title: "",
                description: "",
                location: "",
                date: "",
                email: "",
                phone: 0,
            },
            hasBeenCreatedAd: true,
        });
    }

    //VALUE POR DEFECTO 5
    //STATUS POR DEFECTO AVAILABLE
    //AUTHOR POR DEFECTO

    render(){
        const { image, title, description, location, date, email, phone } = this.state.newAd;

        return(
            <div className="page-create-ad">
                {this.state.hasBeenCreatedAd ?
                    <Redirect to={"/ads"} />
                : 
                    <div>
                        <div className="containerButtonAddPhoto">
                            <button id="buttonAddPhoto">
                                Add photo
                            </button>
                        </div>
                        <div className="form">
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
                            
                            <Button type="submit" onClick={this.handleClickCreateAd}>Create</Button>
                        </div>
                        <Menu user={this.props.user}/>
                    </div>
                }
            </div>
        )
        
    }
}