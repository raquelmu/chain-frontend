import React, { Component } from "react";
import apiClient from "../services/apiClient";
import { Link } from "react-router-dom";
import Menu from "../components/Menu/Menu"
import './Favorites.css'

export default class Favorites extends Component {

  state = {
    
    ads: [],
  }

  componentDidMount(){
    apiClient.getFavoritesUser().then(response => {
      this.setState({ads: response.data})
    })
  }

  

  handleRemove = (id) => {
    apiClient
      .removeFavorite(id)
      .then(() => {
        apiClient.getFavoritesUser().then(response => {
          this.setState({ads: response.data})
        })
      })
      .catch((error) => {
      });
  };
  
  render() {
    const { ads } = this.state;
    return( 
      <div className="page-favorites container">
        <h1>Favorites</h1>
        <ul className="ads-list">
          {ads.length > 0 && ads.map((ad, index) => {
            return (
              <li key={index}>
                <Link to={"/ads/" + ad._id}><img alt="Ad" src={"http://lorempixel.com/200/200/?id=" + ad._id} /></Link>
                <span><Link to={"/ads/" + ad._id}>{ad.title}</Link></span>
                <button className="removeFavorite" onClick={(e) => this.handleRemove(ad._id)}>
                  <i className="fas fa-trash"></i>
                </button>
              </li>
            )
          })}
          </ul>
          <Menu user={this.props.user} />
      </div>
    )
  }
}