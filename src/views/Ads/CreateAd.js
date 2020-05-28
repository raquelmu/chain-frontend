import React, { Component } from "react";
import apiClient from "../../services/apiClient";

export default class CreateAd extends Component {
  state = {
    name: "",
    
  }

  handleAd = (event) => {
    this.setState({ad: event.target.value});
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    apiClient
    .createAd()
    .then(({ data:ad }) => {
      console.log(ad)
    })
    .catch((error) => {
      console.log(error)
    });
  };


  render() {
    return (
      <div>
        <h1>Create ad</h1>
          <form onSubmit={this.handleSubmitForm}>
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
