import React, { Component } from "react";
import apiClient from "../../services/apiClient";
import { Link } from "react-router-dom";
import SearchBar from "../../components/Search/SearchBar";

export default class Ads extends Component {
  state = {
    ads: [],
  };

  loadAds = () => {
    apiClient
      .getAllAds()
      .then((response) => {
        console.log(response)
        this.setState({
          ads: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    console.log("COMPONENT DID MOUNT")
    this.loadAds();
  }


  renderAds = () => {
    const { ads } = this.state;
    return ads.map((ad, index) => {
      return (
        <li key={index}>
          <Link to={"/ads/" + ad._id}>{ad.name}</Link>
        </li>
      );
    });
  };

  render() {
    return (
      <div>
        <SearchBar></SearchBar>
        <h1>Discover</h1>
        <ul>{this.renderAds()}</ul>
      </div>
    );
  }
}
