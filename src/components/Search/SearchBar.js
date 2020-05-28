import React, { Component } from "react";

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
        <h1>Search</h1>
          <input
            type="text"
            name="results"
            id="search"
            placeholder="search"
            value={results}
            onChange={this.handleChange}
          />
      </div>
    );
  }
}

