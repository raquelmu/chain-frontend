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
  

  render() {

console.log(this.state.ad.joined)
    return (
      <div>
        <h1>{this.state.ad.title}</h1>
        <h2>{this.state.ad.joined}</h2>


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
          <button
            onClick={(e) => {
             this.handleJoin(this.state.ad._id, true)  // ,selected;
            }}
          >
            Join
          </button>
          <button
            onClick={(e) => {
              this.handleUnjoin(this.state.ad._id);
            }}
          >
            Unjoin
          </button>
          <button
            onClick={(e) => {
              this.handleAdd(this.state.ad._id);
            }}
          >
            Add Favorite
          </button>
         
      </div>
    );
  }
}
