import React, { Component } from "react";
import Menu from "../../components/Menu/Menu";

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
    console.log(this.props)
    return (
      <div>
        { this.props.location.search !== '' && <SearchBar tellme={ this.handleSearch }/> }
        <h1>Discover</h1>
        <ul>{this.renderAds()}</ul>
        <Menu user={this.props.user}/>

      </div>
    );
  }
}

