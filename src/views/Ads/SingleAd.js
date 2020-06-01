import React, { Component } from "react";
import apiClient from "../../services/apiClient";
import Button from "../../components/Button/Button";

export default class SingleAd extends Component {

  state = {
    ad: {}
  }

  componentDidMount(){
    apiClient.getAdById(this.props.match.params.id)
    .then(response => {
      this.setState({
        ad: response.data
      })
    })
  }

  handleClickAddToFavorite = (adId) => {
    console.log(adId)
    console.log(this.props)
    // apiClient.addFavorite(this.props.user.id)
    //   .then((response) => {
    //     this.setState({ ads: response.data })
    //   })
    //   .catch((error) => {
    //   });
  }
  

  // handleDelete = (id) => {
  //   apiClient
  //     .deleteAd(id)
  //     .then(() => {
  //       //no redirige
  //     })
  //     .catch((error) => {
  //     });
  // };

  

  render() {
    return (
      <div>
        <h1>{this.state.ad.title}</h1>
        {/* { user.session === ad.owner ? <Button layout="delete">Delete</Button> : null } */}
        <button
            onClick={(e) => {
              this.handleDelete(this.state.ad._id);
            }}>
            delete
          </button>
          {/* {user !== pepe ? button : anothebutton} */}

           <button
            onClick={(e) => {
              this.handleUpdate(this.state.ad._id);
            }}
          >
            Update
          </button> 
          
          <Button 
            layout={"Add favorite"}
            onClick={this.handleClickAddToFavorite}>
          </Button>
      </div>
    );
  }
}
