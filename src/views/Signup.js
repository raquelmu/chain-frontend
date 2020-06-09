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
    const { onSignup } = this.props;
    if (username !== "" && password.length>5) {
      onSignup({ username, password });
    }else{
      alert("La contraseña debe tener un mínimo de 6 caracteres")
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
      <div className="container page-signup">
        <Link to={"/"}><i className="fas fa-undo-alt"></i></Link>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            className="inputField"
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
          <Button type="submit">Sign up</Button>
        </form>
        <Link to={'/login'} className="linkToSignup">Already have an account?</Link> 
      </div>
    );
  }
}

