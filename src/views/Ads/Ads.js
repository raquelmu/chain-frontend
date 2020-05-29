import React, { Component } from "react";
import Menu from "../../components/Menu/Menu";

import apiClient from "../../services/apiClient";
import { Link } from "react-router-dom";

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

  handleDelete = (id) => {
    apiClient
      .deleteAd(id)
      .then(() => {
        console.log("done");
        this.loadAds();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //  handleUpdate = (id) => {
  //   apiClient
  //     .updateAd(id)
  //     .then(() => {
  //       console.log("update");
  //       this.loadAds();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  renderAds = () => {
    const { ads } = this.state;
    return ads.map((ad, index) => {
      return (
        <li key={index}>
          <Link to={"/ads/" + ad._id}>{ad.name}</Link>
          <button
            onClick={(e) => {
              this.handleDelete(ad._id);
            }}
          >
            delete
          </button>
          {/* <button
            onClick={(e) => {
              this.handleUpdate(ad._id);
            }}
          >
            Update
          </button>  */}
        </li>
      );
    });
  };

  render() {
    return (
      <div>
        <h1>Discover</h1>
        <ul>{this.renderAds()}</ul>
        <Menu />

      </div>
    );
  }
}
