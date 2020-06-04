import React, { Component } from "react";
import apiClient from "../../services/apiClient";
import Button from '../Button/Button';
import Menu from '../Menu/Menu';


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
        }
       }
    handleInput = (e) => {
        this.setState( {
            newAd: {
                ...this.state.newAd, 
                [e.target.name] : e.target.value
            }
        })
    }

    handleClickCreateAd = () => {
        console.log(this.state.newAd)
        apiClient.createAd(this.state.newAd)
        .then(response => {
            this.props.history.push(`/ads/${response.data._id}`)
        })
        .catch((error) => {
        });
    }

    render(){
        const { title, description, location, date, email, phone } = this.state.newAd;

        return(
            <div className="page-create-ad">
                    <div>
                        <div className="containerButtonAddPhoto">
                            <button id="buttonAddPhoto">
                                Add photo
                            </button>
                        </div>
                        <div className="form">
                            
                            <label>Title</label>
                            <input type="text" name="title" value={title} onChange={this.handleInput} />
                            <label>Description</label>
                            <input type="text" name="description" value={description} onChange={this.handleInput}/>
                            <label>Location</label>
                            <input type="text" name="location" value={location} onChange={this.handleInput}/>
                            <label>Date</label>
                            <input type="date" name="date" value={date} onChange={this.handleInput}/>
                            <label>Email</label>
                            <input type="text" name="email" value={email} onChange={this.handleInput}/>
                            <label>Phone</label>
                            <input type="number" name="phone" value={phone} onChange={this.handleInput}/> 
                            
                            <Button type="submit" onClick={this.handleClickCreateAd}>Create</Button>
                        </div>
                        <Menu user={this.props.user}/>
                    </div>
            </div>
        )
        
    }
}