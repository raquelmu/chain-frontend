import React, { Component } from "react";
import apiClient from "../services/apiClient";
import { Link } from "react-router-dom";
import Menu from "../components/Menu/Menu"
// import Button from "../components/Button/Button";


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
      console.log(response.data)
      this.setState({ads: response.data})
    })
  }

  

  handleRemove = (id) => {
    apiClient
      .removeFavorite(id)
      .then(() => {
        console.log("done");
        apiClient.getFavoritesUser().then(response => {
          console.log(response.data)
          this.setState({ads: response.data})
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  render() {
    const { ads } = this.state;
    return( 
      <div className="page-favorites container">
        <ul>
          {ads.length > 0 && ads.map((ad, index) => {
            return (
              <div key={index}>
                <Link to={"/ads/" + ad._id}><img src={"http://lorempixel.com/200/200/?id=" + ad._id} /></Link>
                <Link to={"/ads/" + ad._id}>{ad.title}</Link> {/* <Button action={ this.handleDelete }> */}
                <button
                  onClick={(e) => {
                    this.handleRemove(ad._id);
                  }}
                >
                  Remove Favorite
                </button>
          
              </div>
            )
          })}
          </ul>
          <Menu user={this.props.user} />
      </div>
    )
  }
}