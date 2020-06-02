import React, { Component } from "react";
import Menu from "../../components/Menu/Menu";

import apiClient from "../../services/apiClient";
import { Link } from "react-router-dom";
import SearchBar from "../../components/Search/SearchBar";

import './Ads.css'

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
          <Link to={"/ads/" + ad._id}><img src={"http://lorempixel.com/500/500/?id=" + ad._id} /></Link>
          <span><Link to={"/ads/" + ad._id}>{ad.title}</Link></span>
        </li>
      );
    });
  };

  render() {
    console.log(this.props)
    return (
      <div className="page-ads">
        <h1>Discover</h1>
        { this.props.location.search !== '' && <SearchBar tellme={ this.handleSearch }/> }
        <ul className="ads-list">{this.renderAds()}</ul>
        <Menu user={this.props.user}/>
      </div>
    );
  }
}

