import React, { Component } from "react";
import './SearchBar.css'

export default class SearchBar extends Component {
  state = {
    results:""
  };

  handleChange = (e) => {
    const { tellme } = this.props
    this.setState({
      [e.target.name]: e.target.value,
    }, () => tellme(this.state.results));
  };

  render() {
    const { results} = this.state;

    return (
      <div>
          <input
            type="text"
            name="results"
            className="inputField"
            id="search"
            placeholder="search"
            value={results}
            onChange={this.handleChange}
          />
      </div>
    );
  }
}

