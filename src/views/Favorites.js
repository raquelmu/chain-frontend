import React, { Component } from "react";
import apiClient from "../services/apiClient";

export default class Favorites extends Component {

  state = {
    // idFavs: [],
    // userId: {},
    ads: [],
  }

  componentDidMount(){
    
    // apiClient.whoami().then(response => {
    //   this.setState({userId: response.data._id})
    apiClient.getFavoritesUser().then(response => {
      this.setState({ads: response.data})
    })
  }

  
  render() {
    const { ads } = this.state;
    return(
    
      <div>
        <ul>
          {ads.length > 0 && ads.map((ad, index) => {
            return (
              <div key={index}>
                <li>{ad.name}</li>
              </div>
            )
          })}
          </ul>
      </div>
    )
  }
}