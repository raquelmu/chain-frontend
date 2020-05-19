import React, { Component } from "react";
import apiClient from "../../services/apiClient";

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
          {ad.name}
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
      </div>
    );
  }
}
