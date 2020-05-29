import React, { Component } from "react";
import apiClient from "../../services/apiClient";
// import apiClient from "../../services/apiClient";


export default class CreateAd extends Component {
    state = {
        newAd : {
            // image: "", 
            title: "",
            description: "",
            location: "",
            // date: "",
            email: "",
            phone: 0,
            author: "",
            price: 5,
            status: "available",

        },
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
                // image: "", 
                title: "",
                description: "",
                location: "",
                // date: "",
                email: "",
                phone: 0,
                author: "",
                price: 5,
                status: "available"
            }
        });
    }

    //VALUE POR DEFECTO 5
    //STATUS POR DEFECTO AVAILABLE
    //AUTHOR POR DEFECTO

    render(){
        const { image, title, description, location, date, email, phone, author, price, status } = this.state.newAd;

        return(
            <div>
                <h1>New Ad</h1>
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

                    <button type="sumbit" value="Create" onClick={this.handleClickCreateAd}>Create</button>

            </div>
        )
        
    }
}