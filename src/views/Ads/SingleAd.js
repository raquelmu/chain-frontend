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

  render() {
    return (
      <div>
        <h1>{this.state.ad.name}</h1>
      </div>
    );
  }
}
