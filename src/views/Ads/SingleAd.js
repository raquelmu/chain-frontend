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


  handleDelete = (id) => {
    apiClient
      .deleteAd(id)
      .then(() => {
        //no redirige
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSelect = (idAd, idUserJoined) => {
    apiClient
      .selectUser(idAd, idUserJoined)
      .then(() => {
        console.log("selected");
        apiClient.getAdById(this.props.match.params.id)
        .then(response => {
          this.setState({
            ad: response.data
          })
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };


  handleJoin = (idAd, selected) => {
    apiClient
      .addJoin(idAd, selected)
      .then(() => {
        console.log("addedjoin");
        apiClient.getAdById(this.props.match.params.id)
        .then(response => {
          this.setState({
            ad: response.data
          })
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };


  handleUnjoin = (id) => {
    apiClient
      .removeJoin(id)
      .then(() => {
        console.log("done");
        apiClient.getAdById(this.props.match.params.id)
        .then(response => {
          this.setState({
            ad: response.data
          })
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  handleAdd = (adsId) => {
    apiClient
      .addFavorite(adsId)
      .then(() => {
        console.log(adsId);
        apiClient.getAdById(this.props.match.params.id)
        .then(response => {
          this.setState({
            ad: response.data
          })
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  goToUpdate(){
 
  }
  

  render() {

console.log(this.state.ad.joined)
    return (
      <div>
        <h1>{this.state.ad.title}</h1>
        <h1>{this.state.ad.userId}</h1>
        <h1>{this.state.ad.image}</h1>
        <h1>{this.state.ad.description}</h1>
        <h1>{this.state.ad.phone}</h1>
        <h1>{this.state.ad.email}</h1>
        <h1>{this.state.ad.date}</h1>
        <h1>{this.state.ad.location}</h1>
        <h1>{this.state.ad.selected}</h1>
        <h1>{this.state.ad.status}</h1>
        <h1>{this.state.ad.price}</h1>


        <h2>{this.state.ad.joined} <button
            onClick={(e) => {
             this.handleSelect(this.state.ad._id)  // ,selected;
            }}
          >
            Select
          </button></h2>


          {/* LOGICA BOTONES MOSTRAR Y NO MOSTRAR
          { user.session === ad.owner ? <Button layout="delete">Delete</Button> : null }        
          {user !== pepe ? button : anothebutton} */}

          
          <Button 
            layout={"Add favorite"}
            onClick={this.handleAdd}>
          </Button>
          <Button 
            layout={"Delete"}
            onClick={this.handleDelete}>
          </Button>
          <Button 
            layout={"Update"}
            onClick={this.goToUpdate}>
          </Button>
          <Button 
            layout={"Join"}
            onClick={this.handleJoin}>
          </Button>
          <Button 
            layout={"Unjoin"}
            onClick={this.handleUnjoin}>
          </Button>
          
         
      </div>
    );
  }
}
