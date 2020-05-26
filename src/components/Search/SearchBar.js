import React, { Component } from "react";

export default class SearchBar extends Component {
  state = {
    results:""
  };

  handleSubmit = (e) => {
    e.preventDefault();    
  };

  cleanForm = () => {
    this.setState({
      results:""
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { results} = this.state;

    return (
      <div>
        <h1>Search</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="results"
            id="search"
            placeholder="search"
            value={results}
            onChange={this.handleChange}
          />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

