import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {

  render() {
    return (
      <div>
        <h1>CHAiN</h1>
        <Link to={'/login'}><button>Login</button></Link> 
        <Link to={'/signup'}><button>Register</button></Link> 
      </div>
    );
  }
}
