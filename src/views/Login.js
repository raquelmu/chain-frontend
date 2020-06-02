import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button/Button"


export default class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { onLogin } = this.props;
    if (username !== "" && password !== "") {
      onLogin({ username, password });
    }
  };

  cleanForm = () => {
    this.setState({
      username: "",
      password: "",
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="container page-login">
        <Link to={"/"}><i className="fas fa-undo-alt"></i></Link>
        <h1>Log in</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            className="inputField"
            id="username"
            placeholder="username"
            value={username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            className="inputField"
            id="password"
            placeholder="password"
            value={password}
            onChange={this.handleChange}
          />
          <Button type="submit">Enter</Button>
        </form>
        <Link to={'/signup'} className="linkToSignup">Haven't registered yet?</Link> 
      </div>
    );
  }
}

