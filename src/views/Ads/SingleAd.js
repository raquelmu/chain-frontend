import React, { Component } from "react";
import apiClient from "../../services/apiClient";

export default class SingleAd extends Component {

  state = {
    ad: {}
  }

  componentDidMount(){
    console.log(this.props)
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
        console.log("done");
        //no redirige
      })
      .catch((error) => {
        console.log(error);
      });
  };

  

  render() {
    return (
      <div>
        <h1>{this.state.ad.title}</h1>
        {/* { user.session === ad.owner ? <Button layout="delete">Delete</Button> : null } */}
        <button
            onClick={(e) => {
              this.handleDelete(this.state.ad._id);
            }}
          >
            delete
          </button>
          {/* {user !== pepe ? button : anothebutton}

           <button
            onClick={(e) => {
              this.handleUpdate(this.state.ad._id);
            }}
          >
            Update
          </button>  */}
      </div>
    );
  }
}
