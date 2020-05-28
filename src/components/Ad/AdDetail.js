import React, { Component } from "react";
import apiClient from "../../services/apiClient";

export default class UpdateAd extends Component {
  state = {
    name: "",
    
  }

  handleAd = (event) => {
    this.setState({ad: event.target.value});
  }

  handleUpdate = (id) => {
    apiClient
      .updateAd(id)
      .then(() => {
        console.log("update");
        this.loadAds(); 
      })
      .catch((error) => {
        console.log(error);
      });
  };


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };


  render() {
    return (
      <div>
        <h1>Update ad</h1>
          <form onSubmit={this.handleUpdate}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              onChange={this.handleChange}
            />
            <input type="submit" value="submit" />
          </form>
      </div>
    );
  }
}
