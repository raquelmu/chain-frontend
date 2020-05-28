import React, { Component } from "react";
import apiClient from "../../services/apiClient";
import { Link } from "react-router-dom";
import SearchBar from "../../components/Search/SearchBar";

export default class Ads extends Component {
  state = {
    ads: [],
    filter: ""
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

  handleSearch = (text) => {
    this.setState({
      filter: text
    })
  }


  renderAds = () => {
    const { ads } = this.state;
    console.log(this.state.filter)
    const filteredArray = ads.filter(ad => {
      if(this.state.filter.length > 0) {
        return ad.title.toLowerCase().includes(this.state.filter.toLowerCase())
      } else {
        return true
      }
    })

    return filteredArray.map((ad, index) => {
      return (
        <li key={index}>
          <Link to={"/ads/" + ad._id}>{ad.title}</Link>
        </li>
      );
    });
  };

  render() {
    return (
      <div>
        <SearchBar tellme={ this.handleSearch }/>
        <h1>Discover</h1>
        <ul>{this.renderAds()}</ul>
      </div>
    );
  }
}
