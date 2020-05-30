import React, { Component } from "react";
import apiClient from "../services/apiClient";
import { Link } from "react-router-dom";


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
                <Link to={"/ads/" + ad._id}>{ad.title}</Link>
              </div>
            )
          })}
          </ul>
      </div>
    )
  }
}