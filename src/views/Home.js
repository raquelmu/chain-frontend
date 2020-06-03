import React, { Component } from "react";
import Button from "../components/Button/Button"
import { Link } from 'react-router-dom'

export default class Home extends Component {

  render() {
    return (
      <div className="container page-home">
        <img class="logo" src="./img/logo-chain.png"/>
        <div className="bottom-buttons">
          <Link to={'/login'}><Button className="white">Log in</Button></Link>
          <Link to={'/signup'}><Button className="primary">Register</Button></Link>
        </div>
      </div>
    );
  }
}
