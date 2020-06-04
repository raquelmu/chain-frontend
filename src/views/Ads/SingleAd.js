import React, { Component } from "react";
import apiClient from "../../services/apiClient";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import './SingleAd.css'
import Menu from "../../components/Menu/Menu";
import moment from 'moment';


export default class SingleAd extends Component {

  state = {
    ad: null,
    hasBeenDeleted: false,
    joined: [],
    selected: ""
  }

  //llamas al ad pasandole el id. despues buscas el perfil del ususario que corresponde al selected enviandole
  // el id del selected el ad, y luego lo guardas en la propiedad selected del estado para llamarlo en el render (vista)
  async componentDidMount(){
    let self = this
    const response = await apiClient.getAdById(this.props.match.params.id)
    if (response) {
      this.setState({
        ad: response.data
      }, async () => {
        const response = await apiClient.getProfileById(this.state.ad.selected)
        this.setState({
          selected: response.data
        })
      })
    }
    //JOINS: Se crea una lista vacía en el estado; se consulta a la base de datos los joined y se hace un
    // foreach que meta toda la info que corresponde al los Id de dentro del joined del ad y se guarda en el estado. 
    //Despues se actualiza añadiendo esa lista al estado (joined: joinedlist -linea 41)
    // se usa self: porque no puedes usar this en una funcion no principal (escope)
    response.data.joined.forEach((join) => {
      let joinedList = [...this.state.joined]
      apiClient.getProfileById(join).then(responseUser => {
        joinedList.push(responseUser.data)
        self.setState({
          joined: joinedList
        })
        console.log(joinedList)
      })
    })
    console.log(this.state.ad)
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
    apiClient
      .addFavorite(adsId)
      .then(() => {
        apiClient.getAdById(this.props.match.params.id)
        .then(response => {
          this.setState({
            ad: response.data,             
          }, () => {
          })
        })
      })
      .catch((error) => {
      });
  };

  

  render() {
    const { user } = this.props;
    return this.state.ad ? (
      <div className="page-single-ad">
          <div className="imageContainer">
            <img alt="Ad" src={"http://lorempixel.com/500/500/?id=" + this.state.ad._id} />
          </div>
          <h1>{this.state.ad.title}</h1>
          <div className="content">
            <div className="single-ad-column-left">
              <p>{this.state.ad.description}</p>
              <p><strong>Fecha de publicación</strong></p>
              <p>{moment(new Date(this.state.ad.date)).format("ddd MMM DD YYYY")}</p>
            </div>
            <div className="single-ad-column-right">
              <p>{this.state.ad.phone}</p>
              <p>{this.state.ad.email}</p>
              <p><strong>Location:</strong> <br />{this.state.ad.location}</p>
              <p><strong>Selected:</strong> <br />{this.state.selected.username}</p>
              <p><strong>Status:</strong> <br />{this.state.ad.status}</p>
              <p><strong>Points:</strong> <br />{this.state.ad.price}</p>
              <Link to={`/profile/${this.state.ad.userId}`}><p>Author</p></Link>
            </div>
          </div>
            {this.props.user._id === this.state.ad.userId &&
              <div>
                { this.state.joined.map((join, i) => {
                  return (
                    <div key={i} className="joinedListItem">
                      <span>{join.username}</span>
                      <Button className="white" onClick={ () => this.handleSelect(this.state.ad._id, join) }>Select</Button>
                    </div>
                  )
                }) }
              </div>
            }
            {this.props.user._id === this.state.ad.userId ?
              <div>
                <button className="buttonRemoveAd" onClick={() => this.handleDelete(this.state.ad._id)}>
                  <i className="fas fa-trash"></i>
                </button>
                <div className="singleAdButtons">
                  <Button onClick={ () => this.handleComplete(this.state.ad._id) }>Complete</Button>
                  <Link to={`/ads/${this.state.ad._id}/update`}>
                    <button className="buttonEditAd"><i className="fas fa-edit"></i></button>
                  </Link>
                </div>
              </div>
            :
              <Button onClick={() => this.handleAdd(this.state.ad._id)}>Add favorite</Button>
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
