import React, { Component } from "react";
import apiClient from "../../services/apiClient";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import './SingleAd.css'
import Menu from "../../components/Menu/Menu";

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
      <div className="page-single-ad">
          <div className="imageContainer">
            <img alt="Ad" src={"http://lorempixel.com/500/500/?id=" + this.state.ad._id} />
          </div>
          <div className="content">
            <div className="single-ad-column-left">
              <h1>{this.state.ad.title}</h1>
              <p>{this.state.ad.description}</p>
              
              <p><strong>Fecha de publicación</strong></p>
              <p>{this.state.ad.date}</p>
            </div>
            <div className="single-add-column-right">
              <p>{this.state.ad.phone}</p>
              <p>{this.state.ad.email}</p>
              <p>{this.state.ad.location}</p>
              <p>{this.state.ad.selected}</p>
              <p>{this.state.ad.status}</p>
              <p>{this.state.ad.price}</p>
            </div>
          </div>
            {this.props.user._id === this.state.ad.userId &&
              <div>
                { this.state.ad.joined.map((join, i) => {
                  return (
                    <div key={i}>
                     <h2>{join}</h2>
                      <button onClick={ () => this.handleSelect(this.state.ad._id, join) }>Select</button>
                    </div>
                  )
                }) }
              <button onClick={ () => this.handleComplete(this.state.ad._id) }>Complete</button>
              </div>
            }
            <Button onClick={() => this.handleAdd(this.state.ad._id)}>Add favorite</Button>
            {this.props.user._id === this.state.ad.userId &&
              <div>
                <button className="buttonRemoveAd" onClick={() => this.handleDelete(this.state.ad._id)}>
                  <i className="fas fa-trash"></i>
                </button>
                <Link to={`/ads/${this.state.ad._id}/update`}>
                  <button className="buttonEditAd"><i className="fas fa-edit"></i></button>
                </Link>
              </div>
            }

            {this.state.ad.joined.includes(this.props.user._id) ?
              <Button onClick={() => this.handleUnjoin(this.state.ad._id)}>Unjoin</Button>
            :
              <Button onClick={this.handleJoin}>Join</Button>
            }

            <Menu user={this.props.user}/>
      </div>
    ) : (
      <div> Loading </div>
    )
  }
}
