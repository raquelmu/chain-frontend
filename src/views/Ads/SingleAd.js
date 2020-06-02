import React, { Component } from "react";
import apiClient from "../../services/apiClient";
import Button from "../../components/Button/Button";
import { Link, Redirect } from "react-router-dom";


export default class SingleAd extends Component {

  state = {
    ad: null,
    hasBeenDeleted: false,
  }

  async componentDidMount(){
    const response = await apiClient.getAdById(this.props.match.params.id)
    if (response) {
      this.setState({ ad:response.data })
    } 
  }


  handleDelete = (id) => {
    apiClient
      .deleteAd(id)
      .then(() => {
        this.setState({
          hasBeenDeleted: true
        })
      })
      .catch((error) => {
      });
  };

  handleSelect = (idAd, idUserJoined) => {
    apiClient
      .selectUser(idAd, idUserJoined)
      .then(() => {
        apiClient.getAdById(this.props.match.params.id)
        .then(response => {
          this.setState({
            ad: response.data
          })
        })
      })
      .catch((error) => {
      });
  };

  handleComplete = (idAd) => {
    apiClient
      .completeUser(idAd)
      .then(() => {
        apiClient.getAdById(this.props.match.params.id)
        .then(response => {
          this.setState({
            ad: response.data
          })
        })
      })
      .catch((error) => {
      });
  };


  handleJoin = () => {
    apiClient
      .addJoin(this.state.ad._id)
      .then(() => {
        apiClient.getAdById(this.props.match.params.id)
        .then(response => {
          this.setState({
            ad: response.data
          })
        })
      })
      .catch((error) => {
      });
  };


  handleUnjoin = (id) => {
    apiClient
      .removeJoin(id)
      .then(() => {
        apiClient.getAdById(this.props.match.params.id)
        .then(response => {
          this.setState({
            ad: response.data
          })
        })
      })
      .catch((error) => {
      });
  };
  
  handleAdd = (adsId) => {
    console.log("El ID es: " + adsId)
    apiClient
      .addFavorite(adsId)
      .then(() => {
        apiClient.getAdById(this.props.match.params.id)
        .then(response => {
          this.setState({
            ad: response.data,             
          }, () => {
            console.log(this.state.ad)
          })
        })
      })
      .catch((error) => {
      });
  };

  

  render() {
    console.log(this.state.ad)
    return this.state.ad ? (
      <div>
          <div>
            <h1>{this.state.ad.title}</h1>
            <h1>{this.state.ad.userId}</h1>{/*  populate */}
            <h1>{this.state.ad.image}</h1>
            <h1>{this.state.ad.description}</h1>
            <h1>{this.state.ad.phone}</h1>
            <h1>{this.state.ad.email}</h1>
            <h1>{this.state.ad.date}</h1>
            <h1>{this.state.ad.location}</h1>
            <h1>{this.state.ad.selected}</h1>
            <h1>{this.state.ad.status}</h1>
            <h1>{this.state.ad.price}</h1>

            { this.state.ad.joined.map((join, i) => {
              return (
                <div key={i}>
                  <h2>{join}</h2>
                  <button onClick={ () => this.handleSelect(this.state.ad._id, join) }>Select</button>
                </div>
              )
            }) }

              <button onClick={ () => this.handleComplete(this.state.ad._id) }>Complete</button>



              {/* LOGICA BOTONES MOSTRAR Y NO MOSTRAR
              { user.session === ad.owner ? <Button layout="delete">Delete</Button> : null }        
              {user !== pepe ? button : anothebutton} */}

              
              <Button onClick={() => this.handleAdd(this.state.ad._id)}>Add favorite</Button>
              <Button onClick={() => this.handleDelete(this.state.ad._id)}>Delete</Button>
              <Link to={`/ads/${this.state.ad._id}/update`}><Button>Update</Button></Link>
              <Button onClick={this.handleJoin}>Join</Button>
              <Button onClick={() => this.handleUnjoin(this.state.ad._id)}>Unjoin</Button>
          </div>
      </div>
    ) : (
      <div> Loading </div>
    )
  }
}
